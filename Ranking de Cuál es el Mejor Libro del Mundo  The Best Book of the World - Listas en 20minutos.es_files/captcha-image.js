// Captcha implementation
// Must be named captchaImplementation
// Must have this functions: show(displayNow: boolean), hide(), validate, getQueryString
// The last line must associate this implementation to the captcha object: captcha.implementation = captchaImplementation;

var captchaImplementation = {

	// API functions
	show: function(displayNow)
	{
		var jqCaptcha = jQuery('#captcha');
		jqCaptcha.html('<div class="captcha"><p><strong>Código de seguridad <em>(introduce el número de la imagen)</em></strong></p>' +
				'<div id="captcha-image"><p>Se mostrará cuando utilices el formulario</p></div>' +
				'</div>');

		if (displayNow)
		{
			captchaImplementation.generateImageHtml();
		}
		else
		{
			jqCaptcha.parents('form').one('click', function() {
				captchaImplementation.generateImageHtml();
			});
		}
	},

	hide: function()
	{
		jQuery('#captcha').html('');
	},

	validate: function()
	{
		return jQuery('#captchaCode').val() != '' && jQuery('#captchaValue').val() != '';
	},

	getQueryString: function()
	{
		return '&captchaCode=' + jQuery('#captchaCode').val() + '&captchaValue=' + jQuery('#captchaValue').val();
	},

	// Particular functions
	generateImageHtml: function()
	{
		var jqCaptchaImage = jQuery('#captcha-image');

		var code = captchaImplementation.generateCode();
		var url = urls.captcha + '?captchaCode=' + code;
		var html = '<img src="' + url + '" />' +
				'<input type="hidden" id="captchaCode" name="captchaCode" value="' + code + '" />' +
				'<input type="text" id="captchaValue" name="captchaValue" value="" autocomplete="off" />' +
				' <a href="#" title="Cambiar imagen" class="aux">Cambiar código de seguridad</a>';

		jqCaptchaImage.html(html);
		jqCaptchaImage.find('a').hide().click(function() {
			captchaImplementation.generateImageHtml();
			return false;
		});
		setTimeout(function() {jQuery('#captcha-image').find('a').fadeIn('fast');}, 5000);
	},

	generateCode: function()
	{
		var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
		var code = "";

		for(i = 0; i < 16; i++) {
			var position = parseInt(Math.random() * charset.length);
			code += charset.charAt(position);
		}

		return code;
	}
};

// Defines the captcha implementation in the captcha main object. Without it, no captcha is used
captcha.implementation = captchaImplementation;