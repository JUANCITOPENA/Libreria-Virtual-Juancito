<?php
include("header.php");
$id = $_GET["id"];
$titulo = $_GET["titulo"];
$autor = $_GET["autor"];
$precio = $_GET["precio"];




//conecta con la base de datos:
$con = mysqli_connect("localhost", "root", "","demo");
//hace la confirmacion de la conexion:
if (!$con)
	{	
		echo "error en la conexion";
		die();
		}
//selecciona la base de datos
$db = mysqlI_select_db("demo");

//consulta
$q="insert into libro
	(id, titulo, autor, precio)
	values
	('".$id."', '".$titulo."', '".$autor."', '".$precio."')";
	

//lleva la consulta a MySql
$consul = mysqli_query($q);

//2da consulta
$q2="select * from libro where id=".$id."";

//vuelvo a llevarle la 2da consulta a MysQl
$consul = mysqli_query($q2);







while ($f=mysqli_fetch_array($consul))
{

	echo "<h1>DETALLES ULTIMO LIBRO AGREADO</h1>";
	
	echo "<div  id = custom>";
	echo "<br>";
	echo "<pre>";
	echo "<p>CODIGO:  ".$f["id"];
	echo "<p>TITULO:  ".$f["titulo"];
	echo "<p>AUTOR:   ".$f["autor"];
	echo "<p>PRECIO:  ".$f["precio"];
	
	echo "</pre>";
	
	echo "</div>";
	echo "<br>";


}

echo "<a href=mostrar.php id =enlace>Ver Listado de Libros</a>";
mysql_close($con);
include("footer.php");
	
?>