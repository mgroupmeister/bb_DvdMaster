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
        'bootstrap-datepicker': 'bootstrap-datepicker/bootstrap-datepicker'
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

        // 一覧表示のデータを取得する
        var kakeiList = new KakeiList();
        kakeiList.fetch({
            success: function success(collection, res, options) {
                // 通信成功時の処理
                console.dir("loading success");
                collection.trigger('onFetch');    // 追記：イベント発火
                // userCollection.trigger('onFetch');  // これでもok
            },
            error: function error() {
                // 通信失敗時の処理
                console.dir("loading error");
            }
        });

        // ローカル実行の場合はデータを取得できない。
        // そのような場合はテスト用にスタブデータをロードする。
        if (kakeiList.isEmpty()) {
            console.dir("loading stub data");
            kakeiList.reset(StubKakeiList);
        }

        // メインビューをレンダリングする（入れ子になっているビューをレンダリングする）
        var appView = new AppView({
            // 一覧表示用のデータをコレクションとしてセットする
            collection: kakeiList,

        });
        $(function () {
            // HTMLのbodyタグ配下（画面全体）を対象としてレンダリングする
            $('body').append(appView.render().el);
        });


        //**********************************************
        // appViewを使わないパターン
        //**********************************************
        //// 一覧表示のビューを準備する
        //var listView = new ListView({
        //    // 受信したデータのリストをセットする
        //    collection: kakeiList,
        //    // html上のid="kakeiListView"の部分にレンダリングする
        //    el: "#kakeiListView",
        //    // デフォルトのdivタグの出力は不要
        //    tagName: ""
        //});
        //// 一覧表示を出力する
        //$(function () {
        //    // HTMLのid="kakei-table"配下を対象としてレンダリングする
        //    $('#kakei-table').append(listView.render().el);
        //    Backbone.history.start();
        //});
        //**********************************************

    }
);