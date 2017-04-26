<?php
namespace API;
abstract class Entity
{
    public function __construct(array $properties = [])
    {
        foreach ($properties as $key => $value)
        {
            if (property_exists($this, $key))
            {
                $this->$key = $value;
            }
        }
    }
}
