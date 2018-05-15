jQuery(document).ready(function() {
	images.ready();
	listActions.ready();
	items.ready();
	votes.ready();
	comments.ready();
	commentsForm.ready();
});

// Functions related with lists
var list = {
	isUserOwner: function()
	{
		return user.list != false && user.list.owner;
	},
	isStarred: function()
	{
		return user.list != false && user.list.starred;
	},
	isFavourite: function()
	{
		return user.list != false && user.list.favourite;
	}
};

// Configure list images to be shown with colorbox
var images = {
	ready: function()
	{
		var jqListImage = jQuery('.cbox-list');
		if (jqListImage.length === 1)
		{
			colorbox.configure('list-image', jqListImage);
		}

		var jqItemImages = jQuery('.cbox-item');
		if (jqItemImages.length >= 1)
		{
			colorbox.configure('list-items-images', jqItemImages);
		}
	}
};

// Configure list images to be shown with colorbox
var items = {
	ready: function()
	{
		jQuery('.descripcion_elemento').delegate('.item-description', 'click', function(e) {
			e.preventDefault();

			var jqDivParent = jQuery(this).parents('.info');
			jqDivParent.find('.descripcion_elemento').hide();
			jqDivParent.find('.descripcion_elemento_larga').show();
		});
	}
};

// Functions related with item votes
var votes = {
	data: [],

	ready: function()
	{
		var jqVote = jQuery('.vote');
		if (jqVote.length >= 1) // If user can vote
		{
			// Get votes stored in a cookie
			var cookieValue = jQuery.cookie(config.cookies.vote);
			if (cookieValue != null)
			{
				votes.data = cookieValue.split('.');
			}

			// Items voted can be re-voted
			for (var i = 0, length = votes.data.length; i < length; i++)
			{
				var value = votes.data[i].split('-');
				votes.displayWarning(value[0], 'Ya has votado este elemento (' + value[1] + ' pto)');
			}

			// jqVote was removed if user has voted the element, so next lines are ignored

			jqVote.find('input').click(function() {
				votes.vote(this);
			});

			jqVote.show();
		}
	},

	vote: function(input)
	{
		var item = input.name.replace('vote-', '');
		var value = input.value;

		votes.displayLoading(item);

		jQuery.ajax({
			url: utils.getUrl('vote/item'),
			data: 'list=' + idList + '&item=' + item + '&value=' + value,
			type: 'POST',
			dataType: 'json',
			timeout: 5000,
			success: function(data)
			{
				if (data.status == 'success')
				{
					votes.data.push(item + '-' + value);
					jQuery.cookie(config.cookies.vote, votes.data.join('.'),
							{expires: 90, path: window.location.pathname.replace(/^(\/[^/]+\/[^/]+).*$/, '$1/')});

					votes.displayOk(item, 'Voto enviado correctamente. En un rato se verá reflejado.');
				}
				else
				{
					votes.displayError(item, data.message);

					if (data.message.match(/Ya has votado este elemento/))
					{
						alert('Recarga la página para visualizar los elementos que ya has votado previamente');
					}
				}
			},
			error: function()
			{
				votes.displayError(item, 'Error al procesar el voto');
			}
		});
	},

	displayLoading: function(item)
	{
		var jqVoteResult = jQuery('#vote-result-' + item);
		jqVoteResult.nextAll('p, ol').remove();
		jqVoteResult.html('Enviando votación...').addClass('cargando').show();
	},

	displayWarning: function(item, message)
	{
		var jqVoteResult = jQuery('#vote-result-' + item);
		jqVoteResult.nextAll('p, ol').remove();
		jqVoteResult.html(message).addClass('yahasvotado').show();
	},

	displayOk: function(item, message)
	{
		var jqVoteResult = jQuery('#vote-result-' + item);
		jqVoteResult.html(message).removeClass('cargando').addClass('exito');
	},

	displayError: function(item, message)
	{
		var jqVoteResult = jQuery('#vote-result-' + item);
		jqVoteResult.html(message).removeClass('cargando').addClass('error');
	}
};

// Functions related with comments, but not with its form
var comments = {
	jqObject: null, // never is removed (can be safely stored) an ready function is always called before other functions
	oldHtml: null,

	ready: function()
	{
		comments.jqObject = jQuery('#comments');

		// Configure pagination links (live)
		jQuery('.listas_paginacion a').live('click', function(event)
		{
			event.preventDefault();

			var page = this.href.replace(/.*#/, '');
			comments.navigate(page, false, false);
		});
	},

	htmlFirstLoad: function()
	{
		comments.navigate(1, true, false);
	},

	navigate: function(page, firstLoad, idComment)
	{
		if (!firstLoad)
		{
			comments.oldHtml = comments.jqObject.html();
			comments.jqObject.find('h6').nextAll().remove();
			comments.jqObject.find('h6').after('<div id="feedback">' +
					'<div class="cargando">' +
					'<img src="' + utils.getUrl('img') + 'ico_cargando02.gif" width="40" height="40" alt="Cargando comentarios" />Cargando comentarios...' +
					'</div>' +
					'</div>');
			comments.scroll(false);
		}

		jQuery.ajax({
			type: "GET",
			dataType: "html",
			url: utils.getUrl('comments', {idList: idList, page: page}),
			timeout: 5000,
			success: comments.navigateSuccess,
			error: comments.navigateError,
			firstLoad: firstLoad,
			idComment: idComment
		});
	},

	navigateSuccess: function(data)
	{
		comments.jqObject.html(data);
		comments.configureCommentsLinks();

		// this reference to jQuery.ajax (firstLoad and idComment were added as attributes
		if (this.firstLoad)
		{
			commentsForm.htmlUser();
		}
		else
		{
			comments.scroll(this.idComment);
		}
	},

	navigateError: function()
	{
		// this reference to jQuery.ajax (firstLoad and idComment were added as attributes
		var firstLoad = this.firstLoad;
		var message = firstLoad ? 'Reintentar la carga de comentarios (necesario para poder comentar)' : 'Recuperar los comentarios anteriores';

		comments.jqObject.find('h6').nextAll().remove();
		comments.jqObject.find('h6').after('<div id="feedback">' +
				'<div class="cargando error">' +
				'<img src="' + utils.getUrl('img') + 'ico_error.gif" width="32" height="32" alt="Error" /' +
				'<strong>Error al cargar los comentarios</strong>' +
				'<ul><li class="ultima"><a href="#">' + message + '</a></li></ul>' +
				'</div>' +
				'</div>');

		comments.jqObject.find('#feedback').find('a').click(function() {
			if (firstLoad)
			{
				comments.htmlFirstLoad();
			}
			else
			{
				comments.jqObject.html(comments.oldHtml);
			}
			comments.scroll(false);
			return false;
		});

		if (firstLoad)
		{
			// commentsForm.htmlUser(); // Discard to display form until comments are loaded succesfully
		}
	},

	scroll: function(idComment)
	{
		if (!idComment)
		{
			window.scrollTo(0, comments.jqObject.offset().top);
		}
		else
		{
			var jqCurrentComment = comments.jqObject.find('#comment-' + idComment);
			window.scrollTo(0, jqCurrentComment.offset().top - 100);
			jqCurrentComment.fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
		}
	},

	configureCommentsLinks: function()
	{
		comments.jqObject.find('.remove-comment').remove();
		if (user.isModerator() || list.isUserOwner())
		{
			jqTools = comments.jqObject.find('.comentario_herramientas');
			jqTools.find('li:eq(0)').removeClass('accion');
			jqTools.append('<li class="accion remove-comment"><a href="#">Borrar comentario</a></li>');
			comments.jqObject.find('.remove-comment a').click(function(event) {
				event.preventDefault();
				comments.remove(this);
			});
		}

		comments.jqObject.find('.notice-comment').each(function() {
			colorbox.configure('notice', jQuery(this));
		});
	},

	remove: function(removeLink)
	{
		var jqLI = jQuery(removeLink).parent();
		var jqComment = jqLI.parents('.comentario');
		var id = jqComment.attr('id').replace('comment-', '');

		if (confirm('¿Estás seguro de querer borrar el comentario?'))
		{
			jqLI.addClass('cargando').html('Enviando petición...');

			jQuery.ajax({
				url: utils.getUrl('comments/remove', {idComment: id}),
				type: 'POST',
				dataType: 'json',
				timeout: 5000,
				success: function(data)
				{
					if (data.status == 'success')
					{
						jqLI.removeClass('cargando').addClass('exito').html('Comentario borrado correctamente');
						jqComment.fadeOut(3000);
					}
					else
					{
						jqLI.removeClass('cargando').addClass('error').html(data.message);
						if (data.message.match(/El comentario ya estaba borrado/))
						{
							jqComment.fadeOut(3000);
						}
					}
				},
				error: function()
				{
					// Show error message and regenerate link
					jqLI.removeClass('cargando').addClass('error').html('Se ha producido un error');
					jqLI.fadeOut(3000, function() {
						jqLI.html('<a href="#">Borrar comentario</a>');
						jqLI.find('a').click(function() {
							comments.remove(this);
							return false;
						});
						jqLI.removeClass('error').show();
					});
				}
			});
		}
	}
};

// Functions related with comments form
var commentsForm = {
	jqObject: null, // Stores the form object, not the parent DIV #comments-form. Not always trust on it
	oldHtmlForm: null,

	ready: function()
	{
		commentsForm.jqObject = jQuery('#comments-form');

		if (commentsForm.jqObject.length == 1)
		{
			commentsForm.jqObject.submit(function() {
				commentsForm.sendForm();
				return false;
			});
		}
	},

	htmlUser: function()
	{
		// No trust on commentsForm.jqObject. Can be not defined
		var jqForm = jQuery('#comments-form');
		if (jqForm.length == 1)
		{
			if (config.comments.onlyRegistered && user.isAnonymous())
			{
				jqForm.hide();

				jQuery('#comment-result').removeClass() // remove all classes
					.html('<div class="only-registered">' +
						'Esta información sólo puede ser comentada por usuarios registrados.<br />' +
						'Si ya lo estás, <a href="' + utils.getUrl('login') + '" title="Iniciar sesión" class="login">identifícate</a>; ' +
						'en caso contrario <a href="' + utils.getUrl('20m/register') + '">regístrate en 20minutos.es</a>.<br /><br />' +
						'Un saludo. Redacción de <a href="' + utils.getUrl('20m') + '">20minutos.es</a>.' +
						'</div>').show();
				colorbox.configure('login', jQuery('#comment-result .login'));
			}
			else
			{
				jqForm.show();
				jQuery('#comment-result').hide();

				if (user.isAnonymous())
				{
					jqForm.find('.form-row:eq(0)').show();
				}
				else
				{
					jqForm.find('.form-row:eq(0)').hide();
				}
				captcha.show(false);
			}
		}
	},

	sendForm: function()
	{
		// Get fields
		var name = jQuery.trim(commentsForm.jqObject.find('#name').val());
		var comment = jQuery.trim(commentsForm.jqObject.find('#comment').val());
		var captchaQueryString = captcha.getQueryString();

		// Check fields
		if (user.isAnonymous())
		{
			if (name == '')
			{
				commentsForm.displayFormError('Debes introducir un nombre');
				return false;
			}
			if (name.length > config.comments.nameLengthMax)
			{
				commentsForm.displayFormError('La longitud del nombre es demasiado larga. Máximo ' +
						config.comments.nameLengthMax + ' caracteres');
				return false;
			}
		}
		else
		{
			name = '';
		}

		if (comment == '')
		{
			commentsForm.displayFormError('Debes introducir un comentario');
			return false;
		}
		if (comment.length > config.comments.commentLengthMax)
		{
			commentsForm.displayFormError('La longitud del comentario es demasiado larga. Máximo ' +
					config.comments.commentLengthMax + ' caracteres');
			return false;
		}

		if (!captcha.validate())
		{
			commentsForm.displayFormError('Debes introducir el código de seguridad');
			return false;
		}

		// Send form
		commentsForm.oldHtmlForm = commentsForm.jqObject.html();
		commentsForm.displayFormLoading();

		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: utils.getUrl('comments/send', {idList: idList}),
			data: 'anonymous=' + (user.isAnonymous()  ? 1 : 0) + '&name=' + encodeURIComponent(name) +
					'&comment=' + encodeURIComponent(comment) + captchaQueryString,
			timeout: 5000,
			success: commentsForm.sendFormSuccess,
			error: commentsForm.sendFormError,
			formData: {name: name, comment: comment}
		});
	},

	sendFormSuccess: function(data)
	{
		if (data.status == 'success')
		{
			commentsForm.regenerateForm(null);
			commentsForm.displayFormSuccess();

			comments.navigate(data.data.page, false, data.data.idComment);
		}
		else
		{
			commentsForm.regenerateForm(this.formData);  // this reference to jQuery.ajax
			commentsForm.displayFormError(data.message);
		}
	},

	sendFormError: function()
	{
		commentsForm.regenerateForm(this.formData);  // this reference to jQuery.ajax
		commentsForm.displayFormError('Se ha producido un error al enviar el comentario');
	},

	displayFormLoading: function(message)
	{
		jQuery('#comment-result').hide();
		commentsForm.jqObject.find('.hacercomentario').html('<div id="feedback">' +
				'<div class="cargando">' +
				'<img src="' + utils.getUrl('img') + 'ico_cargando02.gif" width="40" height="40" alt="Enviando comentario" />Enviando comentario...' +
				'</div>' +
				'</div>');
	},

	displayFormError: function(message)
	{
		var jqMessage = jQuery('#comment-result');
		jqMessage.removeClass('comentario_ok').addClass('comentario_error').
				html(message).show();
	},

	displayFormSuccess: function()
	{
		var message = 'El comentario se ha añadido correctamente';
		var jqMessage = jQuery('#comment-result');
		jqMessage.removeClass('comentario_error').addClass('comentario_ok').
				html(message).show();
	},

	regenerateForm: function(formData)
	{
		commentsForm.jqObject.html(commentsForm.oldHtmlForm);

		// Regenerate input values
		var form = commentsForm.jqObject.get(0);
		form.name.value = formData != null ? formData.name : '';
		form.comment.value = formData != null ? formData.comment : '';

		// Regenerate events
		captcha.show(formData != null); // if formData, display captcha now
		var jqLogin = commentsForm.jqObject.find('.login');
		if (jqLogin.length == 1)
		{
			colorbox.configure('login', jqLogin);
		}
	}
};

var listActions = {
	ready: function()
	{
		jQuery('#list-notice').find('a').each(function() {
			colorbox.configure('notice', jQuery(this));
		});

		jQuery('#list-add-item').find('a').each(function() {
			colorbox.configure('add-item', jQuery(this));
		});

		listActions.readyShare();
	},

	readyShare: function()
	{
		var title = encodeURIComponent(window.document.title);
		var href = encodeURIComponent(window.document.location.href);

		var jqRedes = jQuery('#redessociales');

		jQuery('#list-share').click(function(e) {
			jqRedes.css('left', e.pageX).css('top', e.pageY).fadeIn('slow');
			return false;
		});

		jqRedes.find('ul span').click(function() {
			var site = jQuery(this).parent().attr('class');

			var url = '';
			switch(site)
			{
				case 'blinklist' : url = 'http://www.blinklist.com/index.php?Action=Blink/addblink.php&Url='+href+'&Title='+title; break;
				case 'delicious' : url = 'http://del.icio.us/post?url='+href+'&title='+title; break;
				case 'digg' : url = 'http://digg.com/submit?phase=2&url='+href+'&title='+title;	break;
				case 'enchilame' : url = 'http://enchilame.com/submit.php?url='+href; break;
				case 'facebook' : url = 'http://www.facebook.com/share.php?u='+href; break;
				case 'fresqui' : url = 'http://fresqui.com/enviar?url='+href+'&titulo='+title+'&tipo=noticia'; break;
				case 'igoogle' : url = 'http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk='+href+'&title='+title; break;
				case 'meneame' : url = 'http://meneame.net/submit.php?url='+href; break;
				case 'mrwong' : url = 'http://www.mister-wong.es/index.php?action=addurl&bm_url='+href+'&bm_description='+title; break;
				case 'mylive' : url = 'https://favorites.live.com/quickadd.aspx?marklet=1&mkt=es-es&url='+href+'&title='+title; break;
				case 'myspace' : url = 'http://www.myspace.com/Modules/PostTo/Pages/?u='+href; break;
				case 'nettby' : url = 'http://www.nettby.es/user/edit_link.php?name='+title+'&url='+href; break;
				case 'netvibes' : url = 'http://www.netvibes.com/subscribe.php?url='+href; break;
				case 'readitlater' : url = 'https://readitlaterlist.com/save?url='+href+'&title='+title; break;
				case 'reddit' : url = 'http://reddit.com/submit?url='+href+'&title='+title; break;
				case 'reporter' : url = 'http://reporter.es.msn.com/?fn=contribute&referrer=20minutos.es&URL='+href+'&Title='+title; break;
				case 'stupon' : url = 'http://www.stumbleupon.com/submit.php?url='+href+'&title='+title; break;
				case 'technorati' :	url = 'http://www.technorati.com/search/'+href+'?sub=postcosm'; break;
				case 'twitter' : url = 'http://twitthis.com/twit?url='+href+'&title='+title; break;
				case 'yahoo' : url = 'http://myweb2.search.yahoo.com/myresults/bookmarklet?u='+href+'&t='+title+'&ei=UTF-8'; break;
				case 'wikio' : url = 'http://www.wikio.es/vote?url='+href; break;
				default : return false;
			}
			window.open(url);
			return false;
		});

		jqRedes.find('.cerrar').click(function() {
			jqRedes.fadeOut('slow');
			return false;
		});
	},

	htmlUser: function()
	{
		var jqListFavourite = jQuery('#list-favourite');
		if (jqListFavourite.length === 1)
		{
			var url = jqListFavourite.find('a').attr('href');
			if (list.isFavourite())
			{
				jqListFavourite.html('<a href="' + url + '">Eliminar la lista como favorita</a>');
				jqListFavourite.find('a').click(function() {
					listActions.favourite('delete');
					return false;
				});
			}
			else
			{
				jqListFavourite.html('<a href="' + url + '">Añadir la lista como favorita</a>');
				jqListFavourite.find('a').click(function() {
					listActions.favourite('add');
					return false;
				});
			}
		}

		var jqListStar = jQuery('#list-star');
		if (jqListStar.length === 1)
		{
			if (user.isModerator())
			{
				var url = jqListStar.find('a').attr('href');
				if (list.isStarred())
				{
					jqListStar.html('<a href="' + url + '">Eliminar la lista como destacada</a>');
					jqListStar.find('a').click(function() {
						listActions.star('delete');
						return false;
					});
				}
				else
				{
					jqListStar.html('<a href="' + url + '">Añadir la lista como destacada</a>');
					jqListStar.find('a').click(function() {
						listActions.star('add');
						return false;
					});
				}
				jqListStar.show();
			}
			else
			{
				jqListStar.hide();
			}
		}

		var jqListRemove = jQuery('#list-remove');
		if (jqListRemove.length === 1)
		{
			if (user.isModerator() || list.isUserOwner())
			{
				jqListRemove.find('a').click(function() {
					listActions.remove();
					return false;
				});
				jqListRemove.show();
			}
			else
			{
				jqListRemove.hide();
			}
		}

		var jqListUpdate = jQuery('#list-update');
		if (jqListUpdate.length === 1)
		{
			if (user.isModerator() || list.isUserOwner())
			{
				jqListUpdate.show();
			}
			else
			{
				jqListUpdate.hide();
			}
		}
	},

	favourite: function(action)
	{
		var jqListFavourite = jQuery('#list-favourite');
		if (user.isAnonymous())
		{
			alert('Debes estar autentificado para poder añadir o eliminar una lista como favorita. Identifícate o crea una cuenta de usuario.');
			return;
		}

		var url = jqListFavourite.find('a').attr('href');

		listActions.displayLoading(jqListFavourite);
		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: url,
			data: 'action=' + action,
			timeout: 5000,
			success: function(data)
			{
				if (data.status == 'success')
				{
					if (action == 'add')
					{
						listActions.displayOk(jqListFavourite, 'Lista añadida como favorita');
					}
					else
					{
						listActions.displayOk(jqListFavourite, 'Lista eliminada como favorita');
					}
				}
				else
				{
					if (action == 'add')
					{
						listActions.displayError(jqListFavourite, data.message);
					}
					else
					{
						listActions.displayError(jqListFavourite, data.message);
					}
				}
			},
			error: function()
			{
				listActions.displayError(jqListFavourite, 'Se ha producido un error');
			}
		});
	},

	star: function(action)
	{
		var jqListStar = jQuery('#list-star');
		if (!user.isModerator())
		{
			alert('Debes ser un moderador para poder destacar listas.');
			return;
		}

		var url = jqListStar.find('a').attr('href');

		listActions.displayLoading(jqListStar);
		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: url,
			data: 'action=' + action,
			timeout: 5000,
			success: function(data)
			{
				if (data.status == 'success')
				{
					if (action == 'add')
					{
						listActions.displayOk(jqListStar, 'Lista añadida como destacada');
					}
					else
					{
						listActions.displayOk(jqListStar, 'Lista eliminada como destacada');
					}
				}
				else
				{
					if (action == 'add')
					{
						listActions.displayError(jqListStar, data.message);
					}
					else
					{
						listActions.displayError(jqListStar, data.message);
					}
				}
			},
			error: function()
			{
				listActions.displayError(jqListStar, 'Se ha producido un error');
			}
		});
	},

	remove: function()
	{
		var jqListRemove = jQuery('#list-remove');
		if (!user.isModerator() && !list.isUserOwner())
		{
			alert('Debes ser el creador de la lista o moderador para poder eliminar listas');
			return;
		}
		if (!user.isModerator())
		{
			alert('Para eliminar una lista utiliza la "Gestión de mis listas" que encontrarás en "Mi cuenta"');
			return;
		}
		if (!confirm('¿Estás seguro de querer eliminar la lista?\nTen en cuenta que no podrás recuperarla'))
		{
			return;
		}

		var url = jqListRemove.find('a').attr('href');

		listActions.displayLoading(jqListRemove);
		jQuery.ajax({
			type: "POST",
			dataType: "json",
			url: url,
			timeout: 5000,
			success: function(data)
			{
				if (data.status == 'success')
				{
					listActions.displayOk(jqListRemove, 'Lista eliminada. Al recargar la página dejará de verse.');
				}
				else
				{
					listActions.displayError(jqListRemove, data.message);
				}
			},
			error: function()
			{
				listActions.displayError(jqListRemove, 'Se ha producido un error');
			}
		});
	},

	displayLoading: function(jqObject)
	{
		jqObject.html('<span>Enviando petición...</span>').addClass('cargando');
	},

	displayOk: function(jqObject, message)
	{
		jqObject.html('<span>' + message + '</span>').removeClass('cargando').addClass('exito');
	},

	displayError: function(jqObject, message)
	{
		jqObject.html('<span>' + message + '</span>').removeClass('cargando').addClass('error');
	}
};