/**
 * ヘッダ領域（ログインモーダル、入力モーダルを含む）
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

            // ログイン画面の準備
            console.log("[View]HeaderView::initialize() create model Login");
            var loginForm = new Login();
            this.loginForm = loginForm;

            console.log("[View]HeaderView::initialize() create view LoginView");
            var loginView = new LoginView({
                model: this.loginForm
            });
            this.loginView = loginView;

            // 入力画面の準備
            console.log("[View]HeaderView::initialize() create model Kakei");
            var kakeiForm = new Kakei();
            this.kakeiForm = kakeiForm;

            console.log("[View]HeaderView::initialize() create view InputView");
            var inputView = new InputView({
                model: kakeiForm
            });
            this.inputView = inputView;

        },
        events: {
            // ログインボタンをクリックされた場合の処理を指定
            'click #loginBtn': "onClickLogin",
            // 登録ボタンをクリックされた場合の処理を指定
            'click #inputBtn': "onClickInput"
        },
        render: function () {
            console.log("[View]HeaderView::render()");
            return this;
        },
        presenter: function () {
            return this.model.toEscapedJSON();
        },
        onClickLogin: function(e) {
            console.log("[View]HeaderView::onClickLogin()");
            // ログイン画面のモーダルを表示する
            $('.login-area').html(this.loginView.render().el);
        },
        onClickInput: function(e) {
            console.log("[View]HeaderView::onClickInput()");
            // 入力画面のモーダルを表示する
            $('.input-area').html(this.inputView.render().el);
        }
    });

    return HeaderView;
});
