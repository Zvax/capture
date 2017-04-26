<?php

namespace API;
interface Capturable {
    public function getDescription(): string;
    public function getId(): int;
}
