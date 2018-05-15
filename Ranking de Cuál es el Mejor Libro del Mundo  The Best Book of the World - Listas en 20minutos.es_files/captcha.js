// Functions related with captcha
// A captcha implementation may be defined and associated with this object (captcha). Without it, no captcha is used
var captcha = {
	implementation: false,
	anonymous: true, // use this value if the user object is not available (in iframes)

	isAnonymous: function()
	{
		if (typeof(user) == 'object')
		{
			return user.isAnonymous();
		}
		else
		{
			return captcha.anonymous;
		}
	},

	show: function(displayNow)
	{
		if (!captcha.implementation) return;

		if (config.captcha.onlyAnonymous && !captcha.isAnonymous())
		{
			captcha.implementation.hide();
		}
		else
		{
			captcha.implementation.show(displayNow);
		}
	},

	validate: function()
	{
		if (!captcha.implementation) return true;

		if (config.captcha.onlyAnonymous && !captcha.isAnonymous())
		{
			return true;
		}

		return captcha.implementation.validate();
	},

	getQueryString: function()
	{
		if (!captcha.implementation) return '';

		if (config.captcha.onlyAnonymous && !captcha.isAnonymous())
		{
			return '';
		}

		return captcha.implementation.getQueryString();
	}
};