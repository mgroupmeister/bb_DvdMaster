/**
 * ヘッダ領域（ログインモーダル、入力モーダルを含む）
 * Created by Tetsuya on 2015/11/26.
 */
define([
    'backbone',
    './../modals/InputView',
    '../models/Dvd',
    'bootstrap-datepicker'
], function (Backbone, InputView, Dvd, DatePicker) {
    var HeaderView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]HeaderView::initialize()");

            // 入力画面の準備
            console.log("[View]HeaderView::initialize() create model Dvd");
            var dvdForm = new Dvd();
            this.dvdForm = dvdForm;

            console.log("[View]HeaderView::initialize() create view InputView");
            var inputView = new InputView({
                model: dvdForm
            });
            this.inputView = inputView;

        },
        events: {
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
        onClickInput: function(e) {
            console.log("[View]HeaderView::onClickInput()");
            // 入力画面のモーダルを表示する
            $('.input-area').html(this.inputView.render().el);

            // カレンダによる日付入力を設定
            $('#buyDate').datepicker({
                format: "yyyy/mm/dd",
                language: "ja",
                autoclose: true,
                orientation: "top auto"
            });

            // デフォルト日付を設定
            var today = new Date();
            var year = today.getYear();
            if(year<1000) year+=1900;
            var thismonth = year + "/" + (today.getMonth()+1) + "/" + 1;
            $("#buyDate").datepicker("setDate", today);
       }
    });

    return HeaderView;
});
