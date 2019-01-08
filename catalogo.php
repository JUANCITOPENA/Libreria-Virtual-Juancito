<?php
ob_start("ob_gzhandler");

session_start();
//conectamos a la base de datos
mysqli_connect("localhost","root","","libro");

if(isset($_SESSION['libro']))
$carro=$_SESSION['libro'];else $carro=false;

//y hacemos la consulta

$result = mysqli_query($link, "SELECT * FROM libro");

//$sql = ("SELECT * FROM libro ORDER BY titulo ASC");

?>

<?php
include("header.php");
?>

<h1 align="left">Nuestro Catalogo</h1>

	<div id = "catalogo">
<table width="272" align="center" cellpadding="0" cellspacing="0" style="border: 1px solid #000000;">
  <tr valign="middle" bordercolor="#FFFFFF" bgcolor="#DFDFDF" class="catalogo">
    <td width="170"><strong>Titulo</strong></td>
	<td width="170"><strong>Autor</strong></td>
    <td width="77"><strong>Precio</strong></td>
    <td width="25" align="right"><a href="vercarrito.php?<?php echo SID ?>" title="Ver el contenido del carrito"><img src="images/vercarrito.gif" width="25" height="21" border="0"></a></td>
  </tr>
  <?php

  //mostramos todos nuestros art�culos, viendo si han sido agregados o no a nuestro carro de compra
  while ($f=mysqli_fetch_array($result))
  {

  ?>
  <tr valign="middle" class="catalogo">
    <td><?php echo $row['producto'] ?></td>
	<td><?php echo $row['autor'] ?></td>
    <td><?php echo $row['precio'] ?></td>
    <td align="center">

	<?php

	if(!$carro || !isset($carro[md5($row['id'])]['identificador']) || $carro[md5($row['id'])]['identificador']!=md5($row['id'])){

	?>

	<a href="agregacar.php?<?php echo SID ?>&id=<?php echo $row['id']; ?>"><img src="images/productonoagregado.gif" border="0"  title="Agregar al Carrito"></a><?php }
	else
	//en caso contrario mostramos la otra imagen linkeada., a la p�gina que sirve para borrar el art�culo del carro.
	{?><a href="borracar.php?<?php echo SID ?>&id=<?php echo $row['id']; ?>"><img src="images/productoagregado.gif" border="0" title="Quitar del Carrito"></a><?php } ?></td>
  </tr><?php } ?>
</table>
</div>




<?php
include("footer.php");
ob_end_flush();

?>
