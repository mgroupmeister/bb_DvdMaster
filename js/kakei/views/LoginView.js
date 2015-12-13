/**
 * ログインのモーダル・ポップアップ画面
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    'backbone.modal'
], function (Backbone, BackboneModal) {
    var LoginView = BackboneModal.extend({
        template: '#modal-template-login',
        submitEl: '.modal-submit',
        cancelEl: '.modal-close',
        initialize: function () {
            console.log("[View]LoginView::initialize()");
        },
        // ログインボタンクリックで認証処理を呼び出す。
        // ※onClick eventで実装するとモーダルを閉じることができなかった。destroyで閉じても下の画面が黒いまま・・
        //   submitを利用すれば自動的に閉じた。
        submit: function(){
            console.log("[View]LoginView::submit()" + this.$el.find('input[name="user"]:checked').val() + this.$el.find('input[type="password"]').val());
            this.model.set('user', this.$el.find('input[name="user"]:checked').val());
            this.model.set('password', this.$el.find('input[type="password"]').val());

            this.model.fetch({
                success : function success(model, res) {
                    //self.trigger('onDelete', model);  // イベント発火
                    //alert("login success");
                    console.log("login success" + res);
                },
                error : function error(model, res) {
                    //alert("login failed." + res);
                    console.log("login failed." + res);
                }
            });

            // 一覧を再描画（検索ボタンクリックの処理を実行するイベントを発生させる）
            Backbone.trigger('searchBtnClick');
        }
    });
    return LoginView;
});
