<?php include("header.php"); ?>



<h1>AGREGAR NUEVO LIBRO</h1>
<br>


		<form action=recibe.php method=GET>
		<table width = "" id = "customtable">
		
		
		
		<tr>
	   <th>ID: </th>
	   <td><input type=text name=id></td>
	    <td rowspan = "4"><img src = "images/libros.gif" ></td>
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
	  
	   <td><input type=text name=precio></td>
	   
	   
	   <tr>
	   <td colspan = "3" align = "center" align = "right"><input type=submit value="Enviar Datos" onClick = "validarCamposLibros()" ></td>
	   </tr>
	   </table>
	   </form>
	   
	   


<?php include("footer.php"); ?>
</body>
</html>



