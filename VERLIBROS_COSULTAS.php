<html><head><meta charset="utf-8"></head>

<body>

<?php

$link = mysqli_connect("localhost", "root", "");

mysqli_select_db($link, "libro");

$tildes = $link->query("SET NAMES 'utf8'"); //Para que se muestren las tildes

$result = mysqli_query($link, "SELECT * FROM libro");

mysqli_data_seek ($result, 0);

$extraido= mysqli_fetch_array($result);

echo "- Codigo: ".$extraido['id']."<br/>";

echo "- Titulo: ".$extraido['titulo']."<br/>";

echo "- Autor: ".$extraido['autor']."<br/>";

echo "- Precio: ".$extraido['precio']."<br/>";


mysqli_free_result($result);

mysqli_close($link);

?>

</body>

</html>