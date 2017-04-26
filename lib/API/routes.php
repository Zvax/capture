<?php
return [
    ['POST', '/captures', [\API\API::class, 'insert']],
    ['PUT', '/captures/{id}', [\API\API::class, 'update']],
];
