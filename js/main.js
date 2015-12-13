/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
// requirejs setting
require.config({
    baseUrl: './js/',

    paths: {
        'jquery': 'jquery/jquery',
        'jquery-ui': 'jquery-ui/jquery-ui',
        'underscore': 'underscore/underscore',
        'backbone': 'backbone/backbone',
        'backbone.modal': 'backbone.modal/backbone.modal',
        'backbone.localStorage': 'backbone.localStorage/backbone.localStorage',
        'bootstrap': 'bootstrap/bootstrap',
        'bootstrap-datepicker': 'bootstrap-datepicker/bootstrap-datepicker',
        'dateformat': 'dateformat/dateformat'
        //'babysitter': 'backbone.babysitter/backbone.babysitter',
        //'wreqr': 'backbone.wreqr/backbone.wreqr',
        //'marionette': 'backbone.marionette/backbone.marionette',
        //'bootstrap': 'bootstrap/bootstrap',
        //'bootstrap-datepicker': 'bootstrap-datepicker/bootstrap-datepicker',
        //'bootstrap-dialog': 'bootstrap-dialog/bootstrap-dialog',
        //'bootstrap-select': 'bootstrap-select/bootstrap-select',
        //'hbs': 'require-handlebars-plugin/hbs',
        //'i18next': 'i18next/i18next',
        //'chart': 'Chart.js/Chart',
        //'spin': 'spin/spin',
        //'d3': 'd3/d3',
        //'log4javascript': 'log4javascript/log4javascript'
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        //'jquery-ui': {
        //    deps: ['jquery']
        //},
        //'bootstrap': {
        //    deps: ['jquery','jquery-ui']
        //},
        //'bootstrap-datepicker': {
        //    deps: ['jquery', 'bootstrap']
        //},
        //'bootstrap-dialog': {
         //   deps: ['jquery', 'bootstrap']
        //},
        //'bootstrap-select': {
        //    deps: ['jquery', 'bootstrap']
        //},
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'dateformat': {
            exports: 'DateFormat'
        }
        //'babysitter': {
        //    deps: ['backbone', 'wreqr', 'marionette'],
        //    exports: 'Backbone.Marionette'
        //},
        //'hbs/handlebars': {
        //    exports: 'Handlebars'
        //},
        //'spin': {
        //    exports: 'Spinner'
        //}
        //'i18next': {
        //    deps: ['jquery']
        //}
    }
});

// init my app
//require({
//        hbs: {
//            helperPathCallback: function(name) {return 'aicj/templates/helpers/' + name;}
//        }
//    },
//    [
//        //'aicj/app',
//        'jquery',
//        'jquery-ui',
//        //'bootstrap',
//        //'bootstrap-datepicker',
//        //'bootstrap-dialog',
//        //'bootstrap-select',
//        //'i18next'
//        //'d3'
//    ], function (app) {
//        'use strict';
//        app.start();
//    });
// require(["module/name", ...], function(params){ ... });

require([
        'jquery',
        'backbone',
        'kakei/collections/KakeiList',
        'kakei/views/AppView',
        'kakei/collections/StubKakeiList'
    ], function($, Backbone, KakeiList, AppView, StubKakeiList) {

        console.dir("--main.js Start--");

        // use strict 宣言を使用すると、そのコードは「strictモード（厳格モード）」で実行されるようになります。
        // strictモードでは、より的確なエラーチェックが行われるため、これまでエラーにならなかったような曖昧な
        // 実装がエラー扱いになります。このことにより、コード内に存在する潜在的な問題を早期に発見しやすくなります。
        // また、JavaScriptエンジンによる最適化処理を困難にする誤りを修正するため、strictモードのコードは非strict
        // モードの同一コードよりも高速に実行することができる場合があるなどのメリットがあります。
        'use strict';

        // メインビューをレンダリングする（入れ子になっているビューをレンダリングする）
        var appView = new AppView();
        $(function () {
            // HTMLのbodyタグ配下（画面全体）を対象としてレンダリングする
            $('body').append(appView.render().el);
        });

    }
);