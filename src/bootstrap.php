<?php

namespace Capture;
use Stepping\Action;
use Stepping\Engine;
require __DIR__ . '/../vendor/autoload.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);
setlocale(LC_TIME, 'fr_FR.utf8', 'fra');
date_default_timezone_set('America/Montreal');
$action = new Action('Capture\routeRequest');
$engine = new Engine(makeProdInjector(), $action);
$engine->execute();
