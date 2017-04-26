<?php

namespace API;
class Goal extends Entity implements Capturable
{
    protected $id = -1;
    protected $description = '';
    public function getDescription(): string
    {
        return $this->description;
    }
    public function getId(): int
    {
        return $this->id;
    }
}
