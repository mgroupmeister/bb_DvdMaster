/**
 * 画面全体（ヘッダ領域、検索条件表示領域を含む）
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'underscore',
    'backbone',
    './HeaderView',
    './ListView',
    './SearchView'
    ], function(_, Backbone, HeaderView, ListView, SearchView) {

    var AppView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]AppView::initialize()");
            //_.bindAll(this);
            //var events = {
            //    "click #loginBtn": "onClickLogin"
            //};
            //this.delegateEvents(events);
        },
        render: function() {
            console.log("[View]AppView::render()");

            // ヘッダ領域を表示する
            console.log("[View]AppView::render() -> HeaderView");
            this.headerView = new HeaderView({
                el: "#headerView"
            });

            // 検索領域を表示する
            console.log("[View]AppView::render() -> SearchView");
            // 検索ボタンのクリックを検出するためにSearchViewを起動しておく。
            // fetchはまだ実行しないのでcollectionは設定していない。
            this.searchView = new SearchView({
                el: "#searchView",
            });

            return this;
        }
    });
    return AppView;
});
