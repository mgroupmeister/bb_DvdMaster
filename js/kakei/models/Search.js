/**
 * 検索条件入力フォーム
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone'
], function(Backbone) {
    var Search = Backbone.Model.extend({
        url: function() {
            return "/KakeiREST/webresources/kakei4?"
                + (this.has("searchBuyDateFrom") ? "searchBuyDateFrom=" + this.get("searchBuyDateFrom") : "")
                + (this.has("searchBuyDateTo") ? "&searchBuyDateTo=" + this.get("searchBuyDateTo") : "")
                + (this.has("searchNotes") ? "&searchNotes=" + this.get("searchNotes") : "")
                + (this.has("searchKamokuid") ? "&searchKamokuid=" + this.get("searchKamokuid") : "")
                + (this.has("searchConsumer") ? "&searchConsumer=" + this.get("searchConsumer") : "")
                + (this.has("searchPayer") ? "&searchPayer=" + this.get("searchPayer") : "");
        },

        // インスタンス生成時に実行
        initialize: function() {
            console.dir("[Model]Search::initialize()");
        },

        // バリデーションを定義
        validate: function(attrs) {
            console.dir("[Model]Login::validate()");
            var ret = "";

            if(_.isEmpty(attrs.password)) {
                ret = "入力してください。";
            }

            return ret;
        }
    });
    return Search;
});