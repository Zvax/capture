<?php

namespace API;
use PDO;
class API implements Service
{
    private $pdo;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function insert(Capturable $c)
    {
        $stmt = $this->pdo->prepare('INSERT INTO stuff (description) VALUES (:description)');
        $stmt->bindValue(':description', $c->getDescription(), PDO::PARAM_STR);
        $stmt->execute();
    }
    public function update(Capturable $c)
    {
        $stmt = $this->pdo->prepare('UPDATE stuff SET description=:description WHERE id=:id');
        $stmt->bindValue(':description', $c->getDescription(), PDO::PARAM_STR);
        $stmt->bindValue(':id', $c->getId(), PDO::PARAM_INT);
        $stmt->execute();
    }
}
