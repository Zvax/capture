<?php

namespace Capture\Controller;
use API\API;
use API\Goal;
use Http\Request;
class Captures
{
    private $request;
    private $api;
    public function __construct(Request $request, API $api)
    {
        $this->request = $request;
        $this->api = $api;
    }
    public function insertFromPost()
    {
        $capture = new Goal($this->request->getParameters());
        $this->api->insert($capture);
    }
}
