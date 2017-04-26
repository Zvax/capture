<?php

namespace Capture;
use Auryn\Injector;
use Capture\Exception\MethodNotAuthorized;
use Capture\Exception\PageNotFound;
use FastRoute\Dispatcher;
use FastRoute\RouteCollector;
use Http\Request;
use Http\Response;
use Stepping\Action;
use Stepping\InjectionParams;
function getRoutes(): array
{
    $routes = require __DIR__ . '/routes.php';
    return $routes;
}

function getDispatcher(): Dispatcher
{
    return \FastRoute\simpleDispatcher(
        function (RouteCollector $r)
        {
            foreach (getRoutes() as $route)
            {
                $r->addRoute($route[0], $route[1], $route[2]);
            }
        }
    );
}

function routeRequest(Request $request): Action
{
    $dispatcher = getDispatcher();
    $info = $dispatcher->dispatch($request->getMethod(), $request->getUri());
    switch ($info[0])
    {
        case Dispatcher::NOT_FOUND:
            throw new PageNotFound;
        case Dispatcher::METHOD_NOT_ALLOWED:
            throw new MethodNotAuthorized;
        case Dispatcher::FOUND:
            if (is_array($info[1]))
            {
                $className = $info[1][0];
                $method = $info[1][1];
                $vars = $info[2];
                return new Action("$className::$method", InjectionParams::fromRouteParams($vars));
            }
            else
            {
                if (is_callable($info[1]))
                {
                    return new Action($info[1], InjectionParams::fromRouteParams($info[2]));
                }
                else
                {
                    return new Action("$info[1]", InjectionParams::fromRouteParams($info[2]));
                }
            }
            break;
        default:
            // TODO throw a graver exception
            throw new PageNotFound;
    }
}

function getBuildResponseStep(
    string $content,
    int $code = 200,
    array $headers = []
): Action
{
    $params = new InjectionParams(
        [], [], [], [
              'content' => $content,
              'code' => $code,
              'headers' => $headers,
          ]
    );
    return new Action('Capture\buildResponse', $params);
}

function buildResponse(
    Response $response,
    string $content,
    int $code,
    array $headers
): Action
{
    foreach ($headers as $name => $value)
    {
        $response->setHeader($name, $value);
    }
    $response->setStatusCode($code);
    $response->setContent($content);
    return new Action('Capture\send');
}

function send(Response $response)
{
    foreach ($response->getHeaders() as $header)
    {
        header($header, false);
    }
    echo $response->getContent();
}

function getDefaultInjectionParams(): InjectionParams
{
    $shares = [
        'Http\Request',
        'Http\Response',
    ];
    $aliases = [
        'Http\Request' => 'Http\HttpRequest',
        'Http\Response' => 'Http\HttpResponse',
    ];
    $defines = [
        'http\HttpRequest' => [
            ':get' => $_GET,
            ':post' => $_POST,
            ':files' => $_FILES,
            ':cookies' => $_COOKIE,
            ':server' => $_SERVER,
        ]
    ];
    return new InjectionParams($shares, $aliases, $defines, [], []);
}

function makeProdInjector(): Injector
{
    $injector = new Injector;
    $params = getDefaultInjectionParams();
    $params->addToInjector($injector);
    return $injector;
}
