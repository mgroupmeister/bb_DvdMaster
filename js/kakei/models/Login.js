/**
 * ログイン入力フォーム
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone'
], function(Backbone) {
    var Login = Backbone.Model.extend({
        url: function() {
            return "/KakeiREST/webresources/kakei4/login2" + (this.has("user") ? "/" + this.get("user") : "")
                + (this.has("password") ? "/" + this.get("password") : "");
        },
        index: function(){
            // ソート用（日付）
            return this.get('buyDate');
        },
        toEscapedJSON: function () {
            return _.object(this.map(function (value, attr) {
                return [attr, _.escape(value)];
            }))
        },

        // インスタンス生成時に実行
        initialize: function() {
            console.dir("[Model]Login::initialize()");
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
    return Login;
});