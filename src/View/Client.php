<?php
namespace Capture\View;
use Templating\Renderer;
class Client
{
    private $renderer;
    public function __construct(Renderer $r)
    {
        $this->renderer = $r;
    }
    public function makeHTML(): string
    {
        return $this->renderer->render('index');
    }
}
