<?php 
session_start();
error_reporting(E_ALL);
@ini_set('display_errors', '1');
if(isset($_SESSION['carro']))
$carro=$_SESSION['carro'];else $carro=false;
include("../header.php");
?>





<h1 align="left">Detalle de Su Compra</h1>



<div id = "catalogo">


<?php 
if($carro){
?>


<table width="720" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr bgcolor="silver" class="tit"> 
    <td width="105"><b>Producto</td>
    <td width="207"><b>Precio</td>
    <td colspan="2" align="center"><b>Cantidad de Unidades</td>
    <td width="100" align="center"><b>Borrar</td>
    <td width="159" align="center"><b>Actualizar</td>
  </tr>
  <?php
  $color=array("#ffffff","#F0F0F0");
  $contador=0;
  $suma=0;
   foreach($carro as $k => $v){
   $subto=$v['cantidad']*$v['precio'];
   $suma=$suma+$subto;
   $contador++;
    ?>
  <form name="a<?php echo $v['identificador'] ?>" method="post" action="agregacar.php?<?php echo SID ?>" id="a<?php echo $v['identificador'] ?>">
    <tr bgcolor="<?php echo $color[$contador%2]; ?>" class='prod'> 
      <td><?php echo $v['producto'] ?></td>
      <td><?php echo $v['precio'] ?></td>
      <td width="43" align="center"><?php echo $v['cantidad'] ?></td>
      <td width="136" align="center"> 
        <input name="cantidad" type="text" id="cantidad" value="<?php echo $v['cantidad'] ?>" size="8">
        <input name="id" type="hidden" id="id" value="<?php echo $v['id'] ?>"> </td>
      <td align="center"><a href="borracar.php?<?php echo SID ?>&id=<?php echo $v['id'] ?>"><img src="trash.gif" width="12" height="14" border="0"></a></td>
      <td align="center"> 
        <input name="imageField" type="image" src="actualizar.gif" width="20" height="20" border="0"></td>
  </tr></form>
  <?php }?>
</table>
</div>
<div align="center"><span class="prod"><b align = "right">Total de Articulos: <?php echo count($carro); ?></span> 
</div><br>
<div align="center"><span class="prod"><b align = "right">Total: $<?php echo number_format($suma,2); ?></span> 
</div><br>
<div align="center"><span class="prod"><b align = "right">Continuar la seleccion de productos</span> 
  <a href="catalogo.php?<?php echo SID;?>"><img src="continuar.gif" width="13" height="13" border="0"></a> 
</div>
 
<?php }else{ ?>
<p align="center"> <span class="prod"><b>No hay productos seleccionados</span> <a href="catalogo.php?<?php echo SID;?>"><img src="continuar.gif" width="13" height="13" border="0"></a> 
  <?php }?>
  
<?php 
include("../footer.php");
?>