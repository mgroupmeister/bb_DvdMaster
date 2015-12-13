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

            // SearchViewの検索ボタンクリックによる一覧の更新処理は
            // InputViewなど異なるVIEWでも実行する必要がある。
            // 検索ボタンのDOMイベントをAppViewレベルで監視し、改めてカスタムイベントを発生させることで
            // 配下のVIEWで自身のVIEW内に存在しないボタンのクリックイベントをキャッチできるようにする
            $('#searchBtn').on('click', function(e) {
                Backbone.trigger('searchBtnClick', e);
            });

        },
        events: {
            // 検索ボタンをクリックされた場合の処理を指定
           // 'click #searchBtn': "onClickSearch"
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
        },
        onClickSearch: function() {
            console.log("[View]AppView::onClickSearch()");
        }
    });
    return AppView;
});
