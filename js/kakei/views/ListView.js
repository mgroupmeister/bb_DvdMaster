/**
 * 一覧表示領域（１行分の表示を含む）
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'backbone',
    'kakei/views/ItemView'
], function (Backbone, ItemView) {
    var ListView = Backbone.View.extend({

        // このViewで管理する要素を指定する。
        //el: "#kakeiListView",

        // インスタンス生成時に実行
        initialize: function () {
            console.log("[View]ListView::initialize()");
            this.listenTo(this.collection, 'add', this.append);
        },

        render: function () {
            console.log("[View]ListView::render()");

            if (this.collection) {
                // 表示データが存在する場合に１行ずつレンダリングする
                this.collection.each(function (kakei) {
                    this.append(kakei);
                }, this);
            }
            return this;
        },
        append: function (kakei) {
            console.log("[View]ListView::append()");
            var item_view = (new ItemView({model: kakei, tagName: "tr"})).render();

            var index = this.collection.indexOf(kakei);
            if (index === 0) {
                this.$el.prepend(item_view.el);
            } else {
                item_view.$el.insertAfter(this.$el.children()[index-1]);
            }
        }
    });
    return ListView;
});