/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define(['marionette'], function(Marionette) {
    App = new Backbone.Marionette.Application();

    // App�N�����ɌĂ΂��
    App.addInitializer(function(){
        var router = New Router();
    });

    // App���N��
    App.start();


    // ���[�^�[���`
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

    // �C�x���g���w��
    App.vent.on("change:content", function(content){
        // �������L�q
    });

    // �C�x���g�𔭉�
    App.vent.trigger("change:content", content);

});