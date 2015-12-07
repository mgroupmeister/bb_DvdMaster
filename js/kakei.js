require([
    'jquery/jquery',
    'backbone',
    'kakei/collections/KakeiList',
    'kakei/views/AppView'
], function($, Backbone, KakeiList, AppView) {
        'use strict';
        var kakeiList = new KakeiList();
        kakeiList.fetch();
        var appView = new AppView({
            collection: kakeiList
        });
        $(function () {
            $('body').append(appView.render().el);
            Backbone.history.start();
        });

    }
);
