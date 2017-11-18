<?php
$cmd = "ls";
$output = array();
$ret = null;
exec($cmd,$output,$ret);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>INDEX</title>
</head>
<body>
<h2>
    INDEX -
    <?php
    //echo getcwd();
    ?>
</h2>
<ul>
    <?php
    foreach($output as $key){
        if($key == "index.php") continue;
        echo "<li><a href=\"./" . $key . "\">" . $key . "</a></li>";
    }
    ?>
</ul>
</body>
</html>