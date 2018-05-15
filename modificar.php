<?php
include("header.php");
include("edita.php");

<h1>MODIFICAR LIBRO</h1>
<br>


		<form action=recibe.php method=GET>
		<table width = "" id = "customtable">
		
		
		
		<tr>
	   <th>ID: </th>
	   <td><input type=text name=id></td>
	    <td rowspan = "5"><img src = "images/agregar.png" ></td>
	   </tr>
	   
	   
	   <tr>
	   <th>Titulo:</th>
	   <td> <input type=text name=titulo></td>
	   </tr>
	   <tr>
	   <th>Autor:</th>
	   <td> <input type=text name=autor></td>
	   </tr>
	   <th>Precio:</th> 
	  
	   <td><input type=text name=precio  value=" <?php $f["precio"] ;?> " ></td>
	   <tr>
	   <td colspan = "2" align = "center"><input type=submit value=Enviar></td>
	   </tr>
	   </table>
	   </form>
	   
	   <a href=index.php>Inicio</a>
	   
	   echo $mensaje;


<?php include("footer.php"); ?>
</body>
</html>




