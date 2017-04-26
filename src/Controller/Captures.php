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
    public function updateFromPut()
    {
        $inputStream = fopen("php://input", "r");
        $contents = '';
        while (!feof($inputStream)) {
            $contents .= fread($inputStream, 8192);
        }
        fclose($inputStream);
        $capture = new Goal(json_decode($contents, true));
        $this->api->update($capture);
    }
    public function sendStuffListInJson()
    {
        return getBuildResponseStep(json_encode($this->api->getAllStuff()));
    }
}
