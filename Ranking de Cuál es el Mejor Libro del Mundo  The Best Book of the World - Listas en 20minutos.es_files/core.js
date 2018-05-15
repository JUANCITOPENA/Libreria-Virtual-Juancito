jQuery(document).ready(function() {
	showHide.ready();
});

// Functions to show or hide a block
var showHide = {
	ready: function()
	{
		jQuery('.showHide').live('click', function() {
			var jqLink = jQuery(this);
			var jqContent = jQuery(jqLink.attr('href'));

			if (jqContent.is(':visible'))
			{
				jqContent.hide();
				jqLink.attr('title', 'Mostrar');
			}
			else
			{
				jqContent.show();
				jqLink.attr('title', 'Ocultar');
			}

			if (jqLink.html() == 'Ver más')
			{
				jqLink.hide();
			}
			return false;
		});
	}
}

// Utility functions
var utils = {
	getUrl: function(key, parameters)
	{
		var url = urls[key];
		if (url == undefined)
		{
			return '';
		}

		if (parameters != false)
		{
			for (var name in parameters) {
				url = url.replace(':' + name, parameters[name]);
			}
		}
		return url;
	}
};

// Validate if a string is a valid email
function validateEmail(value)
{
	var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return pattern.test(value);
}