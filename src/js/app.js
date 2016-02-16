(function ($, window, document) {

    var Module = {

        meta: {
            $doc: $(document),
            $win: $(window),
            url: window.location.pathname,
            wHeight: 0,
            wWidth: 0,
            isMobile: false
        },

        ui: {
            
        },

        init: function () {

            this.meta.$win.resize(function () {
                Module.setWindowDimensions();
            }).trigger('resize');

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.ui.$html.addClass('is-mobile');
                this.meta.isMobile = true;
            }

            this.initCommon();

            switch (this.getPageUrl()) {
                case "/":
                case "/index.html":
                    this.initHomePage();
                    break;

                default:
                    console.log('page 404')
            }

        },

        //////////////////////
        // Иниты страниц
        //////////////////////

        initCommon: function () {

        },



        initHomePage: function () {

        },

        //////////////////////
        // Компоненты / Методы
        //////////////////////

        setWindowDimensions: function () {
            Module.meta.wHeight = Module.meta.$win.outerHeight(true);
            Module.meta.wWidth = Module.meta.$win.outerWidth(true);
        },

        getPageUrl: function (url) {
            //@todo Переписать на регулярку!
            var len = window.location.pathname.split('/').length;
            return url = '/'+window.location.pathname.split('/')[len - 1];
        },

        loadTemplate: function(data, callback) {
            $.ajax({
                url: data.page,
                success: function(html) {
                    $(data.selector).html(html);
                    if(callback)callback();
                }
            });
        }
    };

    //////////////////////
    // Global
    //////////////////////
    window._META = Module.meta;

    $(function () {
        Module.init();
    });

})(jQuery, window, document);
