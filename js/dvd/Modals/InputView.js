/**
 * 入力画面のモーダル・ポップアップ画面
 * Created by tetsuya.matsuura on 2015/12/06.
 */
define([
    'backbone',
    'backbone.modal'
], function (Backbone, BackboneModal) {
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
            this.model.set('title', this.$el.find('select[name="title"]').val());
            this.model.set('description', this.$el.find('select[name="description"]').val());
            this.model.set('genre', this.$el.find('select[name="genre"]').val());
            this.model.set('releasedDate', this.$el.find('input[name="releasedDate"]').val());

            if (this.$el.find('input[name="price"]').val()!="0" && this.$el.find('input[name="price"]').val()!="") {
                this.model.set('price', this.$el.find('input[name="price"]').val());
            }

            this.model.set('image', this.$el.find('select[name="image"]').val());

            // POSTメソッドが発行される（サーバ側はPUTで開発していたのでPOSTも追加で用意した）
            this.model.save({
                success : function success(model, res) {
                    //self.trigger('onDelete', model);  // イベント発火
                    console.log("save success" + res);
                },
                error : function error(model, res) {
                    console.log("save failed." + res);
                }
            });

            // 一覧を再描画（検索ボタンクリックの処理を実行するイベントを発生させる）
            Backbone.trigger('searchBtnClick');
        }

    });
    return InputView;
});
