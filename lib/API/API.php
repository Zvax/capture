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
    private function getRows(array $currentRows, \PDOStatement $childrenStmt): array
    {
        $rows = [];
        foreach ($currentRows as $row)
        {
            $childrenStmt->bindValue(':parent', $row['id'], PDO::PARAM_INT);
            $childrenStmt->execute();
            if ($childrenStmt->rowCount() > 0)
            {
                $row['children'] = $this->getRows($childrenStmt->fetchAll(), $childrenStmt);
            }
            $rows[] = $row;
        }
        return $rows;
    }
    public function getAllStuff(): array
    {
        $stmt = $this->pdo->query('SELECT id, description FROM stuff WHERE parentId IS NULL');
        $childrenStmt = $this->pdo->prepare('SELECT id, description FROM stuff WHERE parentId=:parent');
        return $this->getRows($stmt->fetchAll(), $childrenStmt);
    }
}
