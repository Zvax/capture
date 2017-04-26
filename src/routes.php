<?php
return [
    ['GET', '/', [\Capture\Controller\Client::class, 'sendHTML']],
    ['POST', '/captures', [\Capture\Controller\Captures::class, 'insertFromPost']],
];
