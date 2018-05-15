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
$db = mysqli_select_db("demo");

//2da consulta
$q2="select * from libro where id=".$id."";

//vuelvo a llevarle la 2da consulta a MysQl
$consul = mysqli_query($q2);

$f=mysqli_fetch_array($consul);



print "<h1>ACTUALIZAR LIBRO</h1>
<br>


		<form action=actualiza.php method=GET>
		<table  id = customtable>



		<tr>
	   <th>ID: </th>
	   <td><input type=text name=id readonly=readonly value=".$f["id"]."></td>
	   <td rowspan = 4><img src = images/actualizar.jpg ></td>
	   </tr>





	   <tr>
	   <th>Titulo:</th>
	   <td><input type=text name=titulo value=\"".$f["titulo"]."\"></td>
	   </tr>

	   <tr>
	   <th>Autor:</th>

	   <td><input type=text name=autor value=".$f["autor"]."></td>
  </tr>

	   <th>Precio:</th>
	   <td><input type=text name=precio value=".$f["precio"]."></td>

	    <tr>
	   <td><input type=submit value=Actualizar></td>
	    </tr>

	   </table>
	   </form>";









echo "<a href=index.php id = enlace>Regresar al Inicio</a>";
mysqli_close();




include("footer.php");

?>
