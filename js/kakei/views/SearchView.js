/**
 * 検索条件入力領域（一覧表示領域を含む）
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    '../models/Search',
    '../collections/KakeiList',
    '../collections/StubKakeiList',
    './ListView'
], function (Backbone, Search, KakeiList, StubKakeiList, ListView) {
    var SearchView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]SearchView::initialize()");

            // AppViewにて検索ボタンのDOMイベントをカスタムイベントとして発生させたイベントをキャッチする
            this.listenTo(Backbone, 'searchBtnClick', this.onClickSearch);
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
                    //self.trigger('onDelete', model);  // イベント発火
                    //alert("login success");
                    console.log("search success" + res);
                },
                error : function error(collection, res, options) {
                    //alert("login failed." + res);
                    console.log("search failed." + res);
                }
            });

            // ローカル実行の場合はデータを取得できない。
            // そのような場合はテスト用にスタブデータをロードする。
            if (kakeiList.isEmpty()) {
                console.dir("loading stub data");
                kakeiList.reset(StubKakeiList);
                this.collection = kakeiList;
            }

            // 一覧領域を表示する
            console.log("[View]SearchView::onClickSearch() -> ListView");
            this.listView = new ListView({
                // HTML上のid="kakeiListView"のタグ配下にレンダリングする
                el: "#kakeiListView",
                // デフォルトのdivタグの出力は不要
                tagName: "",
                collection: this.collection
            });
            this.$('#kakei-table').append(this.listView.render().el);
        }
    });

    return SearchView;
});
