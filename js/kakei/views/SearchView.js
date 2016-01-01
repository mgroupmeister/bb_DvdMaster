/**
 * 検索条件入力領域（一覧表示領域を含む）
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    '../collections/KakeiList',
    '../collections/StubKakeiList',
    './ListView'
], function (Backbone, KakeiList, StubKakeiList, ListView) {
    var SearchView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]SearchView::initialize()");

            // AppViewにて検索ボタンのDOMイベントをカスタムイベントとして発生させたイベントをキャッチする
            this.listenTo(Backbone, 'searchBtnClick', this.onClickSearch);

            // 一覧のfetchが完了した後に発生するイベント（REST通信が非同期なので完了を検知するために必要）
            this.listenTo(Backbone, 'onFetchList', this.onFetchList);
            this.listenTo(Backbone, 'onFetchListStub', this.onFetchListStub);

            // 一覧領域を表示する
            this.listView = new ListView({
                // HTML上のid="kakeiListView"のタグ配下にレンダリングする
                el: "#kakeiListView",
                // デフォルトのdivタグの出力は不要
                tagName: "",
                collection: this.collection
            });

        },
        events: {
        },
        render: function () {
            console.log("[View]SearchView::render()");
            return this;
        },
        presenter: function () {
            return this.model.toEscapedJSON();
        },
        onClickSearch: function(e) {
            console.log("[View]SearchView::onClickSearch()");
            var kakeiList = new KakeiList([], {
                // 画面の検索条件指定をモデルにセットする
                searchBuyDateFrom: this.$el.find('input[name="searchBuyDateFrom"]').val(),
                searchBuyDateTo: this.$el.find('input[name="searchBuyDateTo"]').val(),
                searchNotes: this.$el.find('input[name="searchNotes"]').val(),
                searchKamokuid: this.$el.find('select[name="searchKamokuid"]').val(),
                searchConsumer: this.$el.find('select[name="searchConsumer"]').val(),
                searchPayer: this.$el.find('select[name="searchPayer"]').val()
            });

            this.collection = kakeiList;

            this.collection.fetch({
                success : function success(collection, res, options) {
                    console.log("search success" + res);
                    // fetch完了のイベントを発生させる
                    Backbone.trigger('onFetchList');
                },
                error : function error(collection, res, options) {
                    console.log("search failed." + res);
                    // fetch完了のイベントを発生させる
                    Backbone.trigger('onFetchListStub');
                }
            });

        },
        onFetchList: function() {
            console.log("[View]SearchView::onFetchList");
            // 一覧領域を表示する
            this.listView.collection = this.collection;
            this.listView.render();
        },
        onFetchListStub: function() {
            console.log("[View]SearchView::onFetchListStub");
            // ローカル実行の場合はデータを取得できない。
            // そのような場合はテスト用にスタブデータをロードする。
            console.dir("loading stub data");
            var kakeiList = new KakeiList();
            kakeiList.reset(StubKakeiList);
            this.collection = kakeiList;
            // 一覧領域を表示する
            this.listView.collection = this.collection;
            this.listView.render();
        }
    });

    return SearchView;
});
