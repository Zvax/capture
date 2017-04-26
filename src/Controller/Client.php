<?php
namespace Capture\Controller;
use function Capture\getBuildResponseStep;
use Storage\FileLoader;
use Templating\PhpTemplatesRenderer;
class Client
{
    public function sendHTML()
    {
        $loader = new FileLoader(__DIR__.'/../../templates', 'php');
        $renderer = new PhpTemplatesRenderer($loader);
        $view = new \Capture\View\Client($renderer);
        return getBuildResponseStep($view->makeHTML());
    }
}
