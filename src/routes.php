<?php
return [
    ['GET', '/', [\Capture\Controller\Client::class, 'sendHTML']],
    ['GET', '/stuff', [\Capture\Controller\Captures::class, 'sendStuffListInJson']],
    ['POST', '/captures', [\Capture\Controller\Captures::class, 'insertFromPost']],
    ['PUT', '/captures', [\Capture\Controller\Captures::class, 'updateFromPut']],
];
