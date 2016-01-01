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
    },

    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap-datepicker': {
            exports: 'DatePicker'
        },
        'dateformat': {
            exports: 'DateFormat'
        }
    }
});

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