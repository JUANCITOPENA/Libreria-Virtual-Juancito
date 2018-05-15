// Configuration
google_ad_client = 'ca-scm-20minutos_js';
google_ad_type = 'text';
google_ad_output = 'js';
google_adtest = 'off';
google_encoding = 'utf-8';
google_language = 'es';
google_safe = 'medium';
google_section = 'default';

google_ad_request_done = function (google_ads)
{
	if (google_ads.length < 1)
	{
		return;
	}
	if (google_ads[0].type == 'text')
	{
		var html = '<div class="publi">';
		html += '<p class="titulo"><strong>Anuncios Google</strong></p>';

		var adsClass = '';
		switch (google_ads.length)
		{
			case 1: adsClass = ''; break;
			case 2: adsClass = 'publix2'; break;
			case 3: adsClass = 'publix3'; break;
			case 4: adsClass = 'publix4'; break;
		}
		html += '<ul class="' + adsClass + '">';

		for (i = 0; i < google_ads.length; i++)
		{
			var onMouse = 'onmouseover="window.status=\'' + google_ads[i].visible_url + '\'; return true;" onmouseout="window.status=\'\'; return true;"';
			html += '<li>';
			html += '<a class="notrack" href="' + google_ads[i].url + '" target="_blank" ' + onMouse + ' title=" ' + google_ads[i].visible_url + '"><strong>' + google_ads[i].line1 + '</strong></a>';
			html += google_ads[i].line2 + ' ' + google_ads[i].line3;
			html += '<span><a class="notrack" href="' + google_ads[i].url + '" target="_blank" ' + onMouse + ' title=" ' + google_ads[i].visible_url + '">' + google_ads[i].visible_url + '</a></span>';
			html += '</li>';
		}

		html += '</ul>';
		html += '</div>';
	}

	document.write(html);
}