<?php

namespace Capture\Controller;
use API\API;
use API\Goal;
use function Capture\getBuildResponseStep;
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
    public function sendStuffListInJson()
    {
        $stuff = iterator_to_array($this->api->getAllStuff());
        return getBuildResponseStep(json_encode($stuff));
    }
}
