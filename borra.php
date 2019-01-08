<?php
include("header.php");

 $id = $_GET["id"];
 
//conecta con la base de datos
$con = mysqli_connect("localhost", "root", "");
//hace la confirmacion de la conexion
if (!$con)
	{	
		echo "error en la conexion";
		die();
		}
//selecciona la base de datos
$db = mysqli_select_db("libro");

//consulta
$q="delete from libro where id=".$id."";
	
//lleva la consulta a MySql
$consul = mysqli_query($q);

echo "<h1 font color = red>LIBRO ELIMINADO EXITOSAMENTE</h2>";


echo "<br>";
echo "<a href=mostrar.php>Ver Libros</a>";
mysqli_close();
	
include("footer.php");

?>
