<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');
ini_set('display_html_errors', 'on');

$db_hostname    = getenv("MYSQL_HOSTNAME") ?: "localhost";
$db_port        = getenv("MYSQL_PORT") ?: "3306";
$db_database    = getenv("MYSQL_DATABASE") ?: "example";
$db_username    = getenv("MYSQL_USER") ?: "example";
$db_password    = getenv("MYSQL_PASSWORD") ?: "example";

try {
    $pdo = new PDO("mysql:host=$db_hostname:$db_port;dbname=$db_database", $db_username, $db_password);
    $stmt = $pdo->query("SELECT * FROM fruits");
    ?><ul><?php
    while ($row = $stmt->fetch()) {
        ?><li><?php echo $row['title']."<br />\n"; ?></li><?php
    }
    ?></ul><?php
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?><details>
    <summary>PHP Info</summary>
    <pre><?php phpinfo(); ?></pre>
</details>
