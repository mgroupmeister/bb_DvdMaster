/**
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    '../models/Search',
    '../collections/KakeiList'
], function (Backbone, Search, KakeiList) {
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
            var kakeiList = new KakeiList({
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
        }
    });

    return SearchView;
});
