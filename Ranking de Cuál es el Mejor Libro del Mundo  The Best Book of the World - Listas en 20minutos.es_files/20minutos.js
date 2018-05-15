var fotocasa_host = "http://www.fotocasa.es/";
var fotocasa_search_url = "http://www.fotocasa.es/search/results.aspx";

var text;
var href;

function fotocasa_sendText(e){
	text = encodeURIComponent(document.getElementById("txtSearchBox").value);
    href = fotocasa_search_url + "?OrigenVisita=45&link=11016&utm_source=20minutos&utm_medium=20minutos_box&utm_campaign=20minutos_boxsearch";
    href = href + "&t=" + text;
	window.open(href);
}

function onEnterpress(e)
{
    //define any varible
    var KeyPress ;
    //if which property of event object is supported 
    if(e && e.which)
    {
        e = e;
        //character code is contained in NN4's which property
        KeyPress = e.which;
    }
    else
    {
        e = event;
        KeyPress = e.keyCode;
    }
    //13 is the key code of enter key
    if(KeyPress == 13)
    {
        //frmLogin is the name of form
        fotocasa_sendText(e);
        //return false;    
    }
}