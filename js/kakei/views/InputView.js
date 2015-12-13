/**
 * 入力画面のモーダル・ポップアップ画面
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    'backbone.modal',
    'bootstrap-datepicker'
], function (Backbone, BackboneModal, DatePicker) {
    var InputView = BackboneModal.extend({
        template: '#modal-template-input',
        submitEl: '.modal-submit',
        cancelEl: '.modal-close',
        initialize: function () {
            console.log("[View]InputView::initialize()");
        },
        // 登録ボタンクリックで認証処理を呼び出す。
        // ※onClick eventで実装するとモーダルを閉じることができなかった。destroyで閉じても下の画面が黒いまま・・
        //   submitを利用すれば自動的に閉じた。
        submit: function(){
            console.log("[View]InputView::submit()");
            this.model.set('buydate', this.$el.find('input[name="buyDate"]').val());
            if (this.$el.find('input[name="payAmount"]').val()!="0" && this.$el.find('input[name="payAmount"]').val()!="") {
                this.model.set('payamount', this.$el.find('input[name="payAmount"]').val());
            }
            if (this.$el.find('input[name="incomeAmount"]').val()!="0" && this.$el.find('input[name="incomeAmount"]').val()!="") {
                this.model.set('incomeamount', this.$el.find('input[name="incomeAmount"]').val());
            }
            this.model.set('kamokuid', this.$el.find('select[name="kamokuId"]').val());
            this.model.set('notes', this.$el.find('input[name="notes"]').val());
            this.model.set('consumer', this.$el.find('input[name="consumer"]:checked').val());
            this.model.set('payer', this.$el.find('input[name="payer"]:checked').val());

            // POSTメソッドが発行される（サーバ側はPUTで開発していたのでPOSTも追加で用意した）
            this.model.save({
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
    return InputView;
});
