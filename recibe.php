<?php
include("header.php");

//conecta con la base de datos:
//$con = mysqli_connect("localhost", "root", "","libro");

$link = mysqli_connect("localhost", "root", "");



//hace la confirmacion de la conexion:
if (!$link)
	{	
		echo "error en la conexion";
		die();
		}
//selecciona la base de datos
//$db = mysqli_select_db("libro");
mysqli_select_db($link, "libro");


$tildes = $link->query("SET NAMES 'utf8'"); //Para que se muestren las tildes

$result = mysqli_query($link, "SELECT * FROM libro");

mysqli_data_seek ($result, 0);

$extraido= mysqli_fetch_array($result);



//lleva la consulta a MySql

//2da consulta

$result = mysqli_query($link, "SELECT * FROM libro");

//vuelvo a llevarle la 2da consulta a MysQl

while ($f=mysqli_fetch_array($result))
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

mysqli_free_result($result);
echo "<a href=mostrar.php id =enlace>Ver Listado de Libros</a>";
echo"<br/>";
include("footer.php");
	
?>