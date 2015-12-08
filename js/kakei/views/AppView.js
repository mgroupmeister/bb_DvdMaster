/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'underscore',
    'backbone',
    './HeaderView',
    './ListView',
    './SearchView',
    '../models/Search',
    '../collections/KakeiList'
    ], function(_, Backbone, HeaderView, ListView, SearchView, Search, KakeiList) {

    var AppView = Backbone.View.extend({
        initialize: function () {
            console.log("[AppView]::initialize()");
            //_.bindAll(this);
            //var events = {
            //    "click #loginBtn": "onClickLogin"
            //};
            //this.delegateEvents(events);
        },
        render: function() {
            // 一覧表示部分のビューを準備する。
            this.listView = new ListView({
                // HTML上のid="kakeiListView"のタグ配下にレンダリングする
                el: "#kakeiListView",
                // デフォルトのdivタグの出力は不要
                tagName: "",
                collection: this.collection
            });
            this.$('#kakei-table').append(this.listView.render().el);

            // ヘッダ領域を表示する
            this.headerView = new HeaderView({
                el: "#headerView"
            });

            // 検索領域を表示する
            var kakeiList = new KakeiList();
            this.searchView = new SearchView({
                el: "#searchView",
                collection: kakeiList
            });

            return this;
        }
        // 現在表示されているview
        //mainView: null,
        //initialize: function() {
        //    // routeオプションでRouterインスタンスを渡す
        //    this.listenTo(this.options.router, 'route', this.dispatch);
        //},
        //dispatch: function(name, args) {
        //    if (!_.include(['index', 'new', 'show', 'edit'], name)) return;
        //    // mainviewがあったら先に削除する
        //    if (this.mainView) this.mainView.remove();
        //    // routerのイベントに応じてmainviewを切り替える
        //},
    });
    return AppView;
});
