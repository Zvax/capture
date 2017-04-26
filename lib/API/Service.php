<?php

namespace API;
interface Service
{
    public function insert(Capturable $c);
    public function update(Capturable $c);
}
