

<?php include("header.php") ?>;

<h1>LISTADO DE LIBROS</h1>
<br>
<table border="1" cellspacing=1 cellpadding=2 " width = 90% align = "center"><tr>
<th><b>CODIGO</b></th>
<th><b>TITULO</b></th>
<th><b>AUTOR</b></th>
<th><b>PRECIO</b></th>
<th colspan = 2><b>ACCIONES</b></th>
</tr>

<?php  


$id = "";
  $con = mysqli_connect("localhost", "root", "","demo");
  $numero = "";
//hace la confirmacion de la conexion
if (!$con)
	{	
		echo "error en la conexion";
		die();
		}
//selecciona la base de datos
$db = mysqli_select_db("demo");

//2da consulta
$q2="select * from libro";

  $consul = mysqli_query($q2);	
while ($row=mysqli_fetch_array($consul))
{


    echo "<tr>";
	echo "<td>". $row["id"]."</td>";
	echo "<td>". $row["titulo"]."</td>"; 
	echo "<td>". $row["autor"]."</td>";
	echo "<td>". $row["precio"]."</td>";
	echo "<td><a href=edita.php?id=".$row["id"].">Editar Libro</a></td>";
	echo "<td><a href=borra.php?id=".$row["id"].">Eliminar</a></td>";
	
   echo "</tr>";
    $numero++;
  }
  echo "<tr><th colspan=\"15\"><b>Total Libros: " . $numero . "</b></th></tr>";
  

?>
</table>
<br>

<a href=agregar.php id = enlace>Agregar Nuevo Libro</a>
<br>
<br>

<?php include("footer.php") ?>;