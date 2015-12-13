/**
 * 一覧表示領域の１行分
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define(['backbone',
    'dateformat'
], function (Backbone, DateFormat) {
    var ItemView = Backbone.View.extend({
        initialize: function () {
            console.log("[View]ItemView::initialize()");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.tagName = "tr";
        },
        events: {
            // ボタンをクリックされた場合の処理を指定（このViewにはボタンが１つしかない）
          'click button': "onClickDelete"
        },
        render: function () {

            //this.id = this.model.id;
            //var list = "<div id='<%=this.model.id%>'><%=this.model.buyDate %></div>"
            //var compiled = _.template(list);
            this.tag="";
            var kakei = this.model;

            // 表示用に日付の書式を変換する
            var dateFormat = new DateFormat("yyyy/MM/dd");
            var formatedBuydate = dateFormat.format(new Date(kakei.get('buydate')));

            var lineHtml = ""
            + "<td nowrap>"
            + formatedBuydate
            + "</td>"
            + "<td nowrap class='currency'>"
            + this.formatNumber(kakei.get('payamount'))
            + "</td>"
            + "<td nowrap class='currency'>"
            + this.formatNumber(kakei.get('incomeamount'))
            + "</td>"
            + "<td nowrap>"
            + kakei.get('kamokuName')
            + "</td>"
            + "<td nowrap>"
            + kakei.get('notes')
            + "</td>"
            + "<td nowrap>"
            + kakei.get('payerName')
            + "</td>"
            + "<td nowrap>"
            + kakei.get('consumerName')
            + "</td>"
            + "<td><button type='button' class='btn btn-danger btn-xs'>delete</button></td>";

            this.$el.html( lineHtml );

            //this.$el.html("test test");
            return this;
        },
        presenter: function () {
            return this.model.toEscapedJSON();
        },
        onClickDelete: function(e) {
            alert("delele "+ this.model.get("id") + "?");
            // 削除するにはモデルのdestroyを実行する
            // collectionに含まれている場合はremoveイベントが発生して一覧から消える
            this.model.destroy({
                success : function success(model, res) {
                    //self.trigger('onDelete', model);  // イベント発火
                    //alert("deleted");
                },
                error : function error(model, res) {
                    alert("delete failed");
                }
            });
        },
        formatNumber: function(num) {
            if (Number(num).length == 0) {
                return "";
            } else {
                return Number(num).toLocaleString();
           }
        }
    });
    // モジュールのviewを返す
    return ItemView;
});
