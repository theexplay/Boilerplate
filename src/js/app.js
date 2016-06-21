(function ($, window, document) {

	var Module = {

		meta: {
			$doc: $(document),
			$win: $(window),
			isMobile: false
		},

		ui: {
			$html: $('html')
		},

		init: function () {

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				this.ui.$html.addClass('is-mobile');
				this.meta.isMobile = true;
			}

		},

		loadTemplate: function (data, callback) {
			$.ajax({
				url: data.page,
				success: function (html) {
					$(data.selector).html(html);
					if (callback)callback();
				}
			});
		}
	};

	window._META = Module.meta;

	$(function () {
		Module.init();
	});

})(jQuery, window, document);
