// Stores the list identifier if we are in the list page
var idList = idList || 0;

// Stores the user identifier if we are in the user page
var idUser = idUser || 0;

jQuery(document).ready(function() {
	user.ready();
	search.ready();
	createListLink.ready();
});

// Functions related to search boxes
var search = {
	ready: function()
	{
		var jqForms = jQuery('#search-form, #search-widget-form');
		if (jqForms.length > 0)
		{
			jqForms.submit(function()
			{
				var text = jQuery.trim(this.search_text.value);
				var type = jQuery(this.search_type).filter(':checked').val();

				if (text.length > 0)
				{
					document.location.href = utils.getUrl('search/type', {type: type, text: text, page: 1});
				}
				else
				{
					document.location.href = this.action;
				}
				return false;
			});
		}
	}
};

// Functions related with user authentication
// List identifier is sent to know if the user is the list owner and if the list is marked as favourite by the user
var user = {
	data: false,
	list: false,

	ready: function()
	{
		user.identify();
	},

	identify: function()
	{
		user.data = false;
		user.list = false;

		if (header.exists()) // Conditions to verify authentication
		{
			if (jQuery.cookie(config.cookies.session) != null)
			{
				jQuery.ajax({
					url: utils.getUrl('identify'),
					type: 'POST',
					data: 'idList=' + idList,
					dataType: 'json',
					timeout: 5000,
					success: function(data)
					{
						if (data.status == 'success')
						{
							user.data = data.data.user;
							user.list = data.data.list;
							user.registered();
						}
						else
						{
							user.anonymous();
						}
					},
					error: function()
					{
						user.anonymous();
					}
				});
			}
			else
			{
				user.anonymous();
			}
		}
	},

	anonymous: function()
	{
		if (typeof(createListLink) == 'object') createListLink.actionUserAnonymous();
		if (typeof(header) == 'object') header.htmlUserAnonymous();
		if (typeof(userPage) == 'object') userPage.htmlUser();
		if (typeof(comments) == 'object') comments.htmlFirstLoad();
		// if (typeof(commentsForm) == 'object') commentsForm.htmlUser(); // Called after i comments.htmlFirstLoad()
		if (typeof(listActions) == 'object') listActions.htmlUser();
	},

	registered: function()
	{
		if (typeof(createListLink) == 'object') createListLink.actionUserRegistered();
		if (typeof(header) == 'object') header.htmlUserRegistered();
		if (typeof(userPage) == 'object') userPage.htmlUser();
		if (typeof(comments) == 'object') comments.htmlFirstLoad();
		// if (typeof(commentsForm) == 'object') commentsForm.htmlUser(); // Called after i comments.htmlFirstLoad()
		if (typeof(listActions) == 'object') listActions.htmlUser();
	},

	isAnonymous: function()
	{
		return user.data == false;
	},

	isModerator: function()
	{
		return !this.isAnonymous() && user.data.role != 'normal';
	}
};

// Display header HTML based on user status
var header = {
	exists: function()
	{
		return jQuery('#user-session').length == 1;
	},

	htmlUserAnonymous: function()
	{
		var jqUserDiv = jQuery('#user-session');
		if (jqUserDiv.length == 1)
		{
			var html = '<ul>';
			html += '<li><a href="' + utils.getUrl('login') + '" title="Iniciar sesión" class="login">Iniciar sesión</a></li>';
			html += '<li class="ultimo"> <a href="' + utils.getUrl('20m/register') + '" title="Regístrate">Regístrate</a></li>';
			html += '</ul>';
			jqUserDiv.html(html);

			colorbox.configure('login', jQuery('.login'));
		}
	},

	htmlUserRegistered: function()
	{
		var jqUserDiv = jQuery('#user-session');
		if (jqUserDiv.length == 1)
		{
			var html = '<ul>';
			html += '<strong>Hola ' + user.data.username + ', </strong>';
			html += '<li> <a href="' + utils.getUrl('private') + '" title="Mi cuenta">Mi cuenta</a></li>';
			if (user.isModerator())
			{
				html += '<li> <a href="' + utils.getUrl('admin') + '" title="Administraci&oacute;n">Administraci&oacute;n</a></li>';
			}
			html += '<li class="ultimo"> <a href="' + utils.getUrl('logout') + '" title="Cerrar sesi&oacute;n" class="logout">Cerrar sesi&oacute;n</a></li>';
			html += '</ul>';
			jqUserDiv.html(html);

			colorbox.configure('logout', jQuery('.logout'));
		}
	}
};

// Display HTML of user pages based on user status
var userPage = {
	htmlUser: function()
	{
		if (idUser != 0)
		{
			var jqUserDiv = jQuery('.perfil_detalle');
			if (!user.isAnonymous() && idUser == user.data.id)
			{
				jqUserDiv.find('.botonera').show();
				jqUserDiv.prev('.botonera').show();
			}
			else
			{
				jqUserDiv.find('.botonera').hide();
				jqUserDiv.prev('.botonera').hide();
			}
		}
	}
};

// Functions related with colorbox
var colorbox = {
	configure: function(type, jqObject)
	{
		var optionsGeneral = {transition:'elastic', speed:'650',
			onOpen: function() {
				jQuery('.listas_banner, .cajalateralpubli').css({'visibility':'hidden'});
				if (jQuery.browser.msie && jQuery.browser.version=='7.0')
				{
					jQuery('html').css({overflow:'hidden'});
				}
				else
				{
					jQuery('body').css({overflow:'hidden'});
				}
			},
			onCleanup: function() {
				jQuery('.listas_banner, .cajalateralpubli').css({'visibility':'visible'});
				if (jQuery.browser.msie && jQuery.browser.version=='7.0')
				{
					jQuery('html').css({overflow:'auto'});
				}
				else
				{
					jQuery('body').css({overflow:'auto'});
				}
			}
		};

		var optionsParticular = {};
		switch(type)
		{
			case 'login':
				optionsParticular = {width:'550px', height:'560px', iframe:true};
				break;
			case 'logout':
				optionsParticular = {width:'550px', height:'300px', iframe:true};
				break;
			case 'notice':
			case 'add-item':
				optionsParticular = {width:'550px', height:'600px', iframe:true};
				break;
			case 'list-image':
				optionsParticular = {transition: 'none', width: '75%', height: '90%'};
				break;
			case 'list-items-images':
				optionsParticular = {rel: 'group', transition: 'none',
					width: '75%', height: '90%',
					next: 'Siguiente >', previous: '< Anterior',
					current:'Imagen {current} de {total}',
					slideshow: true, slideshowAuto: false, slideshowSpeed: 3000,
					slideshowStart: 'Iniciar diapositivas', slideshowStop: 'Parar diapositivas'};
				break;
		}

		jQuery.extend(optionsGeneral, optionsParticular);
		jqObject.colorbox(optionsGeneral);
	}
};

var createListLink = {
	loginProcessLaunched: false,

	ready: function()
	{
		var jqLink = jQuery('#ui-create-list-link');
		if (jqLink.length > 0)
		{
			jqLink.bind('click', function(e) {
				e.preventDefault();
				createListLink.link(this);
			});
		}
	},

	link: function(linkElement)
	{
		if (user.isAnonymous())
		{
			var jqLink = jQuery('<a href="' + utils.getUrl('login') + '"></a>');
			colorbox.configure('login', jqLink);
			jqLink.click();

			createListLink.loginProcessLaunched = true;
		}
		else
		{
			window.location.href = utils.getUrl('private/list-create');
		}
	},

	actionUserAnonymous: function() {
		createListLink.loginProcessLaunched = false;
	},

	actionUserRegistered: function() {
		if (createListLink.loginProcessLaunched)
		{
			createListLink.loginProcessLaunched = false; // page will change so it is useless

			setTimeout(function() {
				window.location.href = utils.getUrl('private/list-create');
			}, 2000); // 2000 < 3000 used as close login layer timeout
		}
	}
};