<?php
include("../header.php");

 $id = $_GET["id"];
 $titulo = $_GET["titulo"];
 $autor = $_GET["autor"];
 $precio = $_GET["precio"];








//conecta con la base de datos
$con = mysqli_connect("localhost", "root", "","demo");
//hace la confirmacion de la conexion
if (mysqli_connect_errno())
	{
		 echo "Failed to connect to MySQL: " . mysqli_connect_error();
     }


//selecciona la base de datos
$db = mysqli_select_db("demo");

//consulta
$q="UPDATE  libro SET
		titulo = '".$titulo."',
		autor = '".$autor."',
		precio = '".$precio."'
		where id= '".$id."'";

//lleva la consulta a MySql
$consul = mysqli_query($q);

//2da consulta
$q2="select * from libro where id=".$id."";

//vuelvo a llevarle la 2da consulta a MysQl
$consul = mysqli_query($q2);

while ($f=mysqli_fetch_array($consul))
{

echo "<h2>EL LIBRO SE HA ACTUALIZADO</h2>";

	echo "ID: ".$f["id"];
	echo "<br>";
	echo "Titulo: ".$f["titulo"];
	echo "<br>";
	echo "Autor: ".$f["autor"];
	echo "<br>";
	echo "Precio: ".$f["precio"];

}
echo "<br>";
echo "<br>";
echo "<a href=mostrar.php>Ver Libros</a>";
mysqli_close();


include("../footer.php");
?>
