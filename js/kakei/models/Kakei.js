/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'backbone'
], function(Backbone) {
    var Kakei = Backbone.Model.extend({
        url: function() {
            return "/KakeiREST/webresources/kakei4" + (this.has("id") ? "/" + this.get("id") : "");
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
            console.dir("[Model]Kakei::initialize()");
        },

        // バリデーションを定義
        validate: function(attrs) {
            console.dir("[Model]Kakei::validate()");
            var ret = "";

            if(_.isEmpty(attrs.notes)) {
                ret = "入力してください。";
            }

            return ret;
        }
    });
    return Kakei;
});