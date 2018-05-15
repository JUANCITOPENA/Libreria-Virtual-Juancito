var sas_tmstp = Math.round(Math.random()*10000000000);
var sas_masterflag = 1;

function SmartAdServer(sas_pageid,sas_formatid,sas_target) {
	var sas_master = 'S';
	if(sas_masterflag == 1) {
		sas_masterflag = 0;
		sas_master = 'M';
	}
	document.write('<scr' + 'ipt SRC="http://smart.20minutos.es/call/pubj/' + sas_pageid + '/' + sas_formatid + '/'+sas_master + '/' + sas_tmstp + '/' + escape(sas_target) + '?"></scr'+'ipt>');
}