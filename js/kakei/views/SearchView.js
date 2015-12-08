/**
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    '../models/Search'
], function (Backbone, Search) {
    var SearchView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]SearchView::initialize()");
        },
        events: {
            // 検索ボタンをクリックされた場合の処理を指定
            'click #searchBtn': "onClickSearch"
        },
        render: function () {
            return this;
        },
        presenter: function () {
            return this.model.toEscapedJSON();
        },
        onClickSearch: function(e) {
            //var kakeiList = new KakeiList();
            //this.collection = kakeiList;
            // 画面の検索条件指定をモデルにセットする
            console.log("[View]SearchView::onClickSearch()" + this.$el.find('input[name="searchBuyDateFrom"]').val());
            console.log("before " + this.collection.get("searchBuyDateFrom"));
            this.collection.set('searchBuyDateFrom', this.$el.find('input[name="searchBuyDateFrom"]').val());
            console.log("after " + this.collection.get("searchBuyDateFrom"));
            //this.collection.setSearchBuyDateFrom(this.$el.find('input[name="searchBuyDateFrom"]').val());
            this.collection.set('searchBuyDateTo', this.$el.find('input[name="searchBuyDateTo"]').val());
            this.collection.set('searchKamokuid', this.$el.find('select[name="searchKamokuid"]').val());
            this.collection.set('searchNotes', this.$el.find('input[name="searchNotes"]').val());
            this.collection.set('searchConsumer', this.$el.find('select[name="searchConsumer"]').val());
            this.collection.set('searchPayer', this.$el.find('select[name="searchPayer"]').val());

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
        }
    });

    return SearchView;
});
