<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>.:: Libreria Juancito ::.</title>
<link rel="stylesheet" href="css/styles.css" type="text/css" />
<link rel="stylesheet" href="css/style.css" type="text/css" />

<script src="js/jquery.js" type="text/javascript"></script>
<script src="js/carousel.js" type="text/javascript"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js?ver=1.4.2"></script>
    <script src="js/login.js"></script>
<!--baner-->
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.nivo.slider.pack.js"></script>
    <script type="text/javascript">
    $(window).load(function() {
        $('#slider').nivoSlider();
    });
    </script>
	
	
	
	<script type="text/javascript">
		
			function validarCampos(){
							
			var usuario = document.getElementById("usuario").value;
			var clave = document.getElementById("password").value;
								
								
			if(usuario == "" ){
				alert('Campo USUARIO esta Vacio');
				
					}
			else 
			{
			
			alert('Campo CLAVE esta Vacio');
			
			}
			}
			
			
			function validarCamposLibros(){
							
			var id = document.getElementsByName("id").value;
			var titulo = document.getElementsByName(("titulo").value;
			var autor = document.getElementsByName(("autor").value;
			var precio = document.getElementsByName(("precio").value;
								
								
			if(id == "" ){
				alert('Campo ID esta Vacio');
				
			}
			else if (titulo == "" )
			{
			
			
			alert('Campo TITULO esta Vacio');
			
			}
			
			else if((autor == "" ))
			{
			alert('Campo AUTOR esta Vacio');
			
			}
			else
			{
			alert('Campo PRECIO esta Vacio');
			
			}
			
							
			</script>
	
	
	
	
	
	<!--Funcion de Carrusel de libros-->
	
	<script type="text/javascript">
stepcarousel.setup({
	galleryid: 'carousel', //id of carousel DIV
	beltclass: 'belt', //class of inner "belt" DIV containing all the panel DIVs
	panelclass: 'panel', //class of panel DIVs each holding content
	autostep: {enable:true, moveby:1, pause:3000},
	panelbehavior: {speed:500, wraparound:true, persist:true},
	statusvars: ['statusA', 'statusB', 'statusC'], //register 3 variables that contain current panel (start), current panel (last), and total panels
	contenttype: ['external'] //content setting ['inline'] or ['external', 'path_to_external_file']
})
</script>


<!--fin carrusel de libros-->
	
	
	
	<!--fin banner-->
	
	<script src="jquery.js" type="text/javascript"></script>
<script src="carousel.js" type="text/javascript"></script>

<style type="text/css">
	
	
	
	

    <style type="text/css">
<!--
.Estilo21 {color: #FF0000}
-->
#catalogo{
	width: 960px;
	margin-top:10px;


}


#enlace{
background:silver;
padding:5px;
margin:25px;
border: 2px solid blue;
margin-left:450px;
}




.tit {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 9px;
	color: #FFFFFF;
}
.prod {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 9px;
	color: #333333;
}
h1 {
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-size: 20px;
	color: #990000;
	margin-top:30px;
	margin-left:10px;
	
}


		/* Carousel */
		
#carousel {
	position: relative; /* Necesario */
	overflow: hidden; /* Necesario */
	height: 250px;
	margin-left:35px;
	background:#5B5B5B url(images/carousel-bg.png) bottom left repeat-x;
}

#custom{
width:941px;
margin: 0 auto 0 auto;
margin-top:25px;
border-top: 2px solid blue;
border-bottom: 2px solid blue;
padding:10px;


}

#custom p{
	font-size:25px;
	

	}

#carousel .belt {
	position: absolute; /* Necesario */
	left: 0;
	top: 0;
	margin:0 10px 10px 0;
}

#carousel .panel {
	width:265px;
	float: left; /* Necesario */
	overflow: hidden;
	margin: 15px;
	padding:7px;
	border:1px solid #5B5B5B;
	background:#383838 url(images/carousel-panel-bg.png) bottom left repeat-x;
}

#carousel .panel .panel-text {
	padding-top:5px;
	font-size:13px;
	font-family:Verdana, Geneva, sans-serif;
	color:#FFF;
}

#carousel .panel .panel-text a {
	color:#CCC;
	text-decoration:none;
}

#carousel .panel .panel-text a:hover {
	color:#FFF;
	text-decoration:underline;
}

			/* Botones del carousel */
			
.button-prev {
	height:250px;
	width:35px;
	float:left;
	background:#5B5B5B url(images/carousel-bg.png) bottom left repeat-x;
	-moz-border-radius:10px 0 0 10px;
}

.button-prev a {
	display:block;
	padding:5px;
	margin-top:105px;
}

.button-next {
	height:250px;
	width:35px;
	float:right;
	background:#5B5B5B url(images/carousel-bg.png) bottom left repeat-x;
	-moz-border-radius:0 10px 10px 0;
}

.button-next a {
	display:block;
	padding:5px;
	margin-top:105px;
}


a img {
	border:none;
}

#customtable {
width: 90%;
margin-left:100px;
}

#imgagregar {
float:left;
display:inline;
}


</style>







	
	<LINK REL="SHORTCUT ICON" HREF="http://www.tu_web.com/tu_icono.ico">
</head>









<body>
<div id="container">
<div id="inner">


	<div id="header">
    	<h1><a href="/"><img src = "images/logo.png"> </a></h1>
       
        
        
        <div class="clear"></div>
    </div>
	
	<div id="nav">
    	<ul>
        	<li><a href="index.php">INICIO</a></li>
            <li><a href="nosotros.php">NOSOTROS</a></li>
            <li><a href="catalogo.php">Nuestros libros</a></li>
            <li><a href="contacto.php">Contactos</a></li>
			 <li><a href="escritores.php">Sobre los Escritores</a></li>
			 <li><a href="webmaster.php">Web Master</a></li>
			  <li><a href="sistema.php">Sistema</a></li>
			 
			 
			 <div id="container">
		
		
            <!-- Login Starts Here -->
            <div id="loginContainer">
                <a href="#" id="loginButton"><span>Entrar</span><em></em></a>
                <div style="clear:both"></div>
                <div id="loginBox">                
                    <form id="loginForm" method = "post" action = "../lib/validar_usuario.php">
                        <fieldset id="body">
                            <fieldset>
                                <label for="usuario">Usuario</label>
                                <input type="text" name="usuario" id="usuario" />
                            </fieldset>
                            <fieldset>
                                <label for="password">Clave</label>
                                <input type="password" name="password" id="password" />
                            </fieldset>
                            <input type="submit" id="login" value="Entrar" onClick = "validarCampos()" />
							
							
							
							
							
							
                            <label for="checkbox"><input type="checkbox" id="checkbox" />Recordar datos</label>
                        </fieldset>
                        <span><a href="#">Olvide mi clave?</a></span>
                    </form>
                </div>
            </div>
            <!-- Login Ends Here -->
			
			
			
        </div>
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
        </ul>
    </div>
	
	<div id="banner">
	
	     <div id="slider-wrapper">        
            <div id="slider" class="nivoSlider">
                <img src="images/slide1.jpg" alt="MIERDA" width="960" height="250" /> 
                <img src="images/slide2.jpg" alt="MIERDA" width="960" height="250" /> 
                <img src="images/slide3.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide4.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide5.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide6.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide7.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide8.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide9.jpg" alt="MIERDA" width="960" height="250" /> 
                <img src="images/slide10.jpg" alt="MIERDA" width="960" height="250" /> 
                <img src="images/slide11.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide12.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide13.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide14.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide15.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide16.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide17.jpg" alt="MIERDA" width="960" height="250" />
				<img src="images/slide18.jpg" alt="MIERDA" width="960" height="250" />
				<img src="images/slide19.jpg" alt="MIERDA" width="960" height="250" /> 
				<img src="images/slide20.jpg" alt="MIERDA" width="960" height="250" />
				<img src="images/slide21.jpg" alt="MIERDA" width="960" height="250" />
            </div>
				
        </div>
	   
	   
	</div>
	<br />
	<br />
	
	<table width="40" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td><span style="color: #FFFFFF"> <span style="font-size: 22px">
      <Marquee heigh=50 bgcolor=”cyan”>
        
        
     Un Libro Abierto Es Un Cerebro Que Habla, Cerrado Un Amigo Que Espera, Olvidado Un Alma Que Perdona, Destruido Un Corazón Que Llora.     
      
	  </Marquee>
    </span> </span> </td>
  </tr>
</table>