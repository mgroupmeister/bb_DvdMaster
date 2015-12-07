/**
 * 検索条件入力領域
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone'
], function(Backbone) {
    var Search = Backbone.Model.extend({
        url: function() {
            return "/KakeiREST/webresources/kakei4/login2" + (this.has("user") ? "/" + this.get("user") : "")
                + (this.has("password") ? "/" + this.get("password") : "");
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