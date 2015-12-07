/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define(['marionette'], function(Marionette) {
    App = new Backbone.Marionette.Application();

    // App起動時に呼ばれる
    App.addInitializer(function(){
        var router = New Router();
    });

    // Appを起動
    App.start();


    // ルーターを定義
    var Router = Backbone.Router.extend({
        routes : {
            "" : "index",
            ":content" : "changeContent"
        },
        index : function(){
            this.navigate("news", {trigger:true});
        },
        changeContent : function(content){
            App.vent.trigger("change:content", content);
        }
    });

    // イベントを購読
    App.vent.on("change:content", function(content){
        // 処理を記述
    });

    // イベントを発火
    App.vent.trigger("change:content", content);

});