/**
 * Created by Tetsuya on 2015/11/26.
 */
define([
    'backbone',
    './LoginView',
    '../models/Login',
    './InputView',
    '../models/Kakei'
], function (Backbone, LoginView,  Login, InputView, Kakei) {
    var HeaderView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]HeaderView::initialize()");
        },
        events: {
            // ログインボタンをクリックされた場合の処理を指定
            'click #loginBtn': "onClickLogin",
            'click #inputBtn': "onClickInput"
        },
        render: function () {
            return this;
        },
        presenter: function () {
            return this.model.toEscapedJSON();
        },
        onClickLogin: function(e) {
            var loginForm = new Login();

            // ログインのモーダルを表示する
            var loginView = new LoginView({
                model: loginForm
            });
            $('.login-area').html(loginView.render().el);
        },
        onClickInput: function(e) {
            var kakeiForm = new Kakei();

            // 入力画面のモーダルを表示する
            var inputView = new InputView({
                model: kakeiForm
            });
            $('.input-area').html(inputView.render().el);
        }
    });

    return HeaderView;
});
