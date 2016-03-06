/**
 * 一覧表示領域（１行分の表示を含む）
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'backbone',
    '..//views/ItemView'
], function (Backbone, ItemView) {
    var ListView = Backbone.View.extend({

        // インスタンス生成時に実行
        initialize: function () {
            console.log("[View]ListView::initialize()");
        },
        render: function () {
            console.log("[View]ListView::render()" );

            // 画面に表示している一覧をクリアする
            this.$el.html("");

            // 表示データが存在する場合に１行ずつレンダリングする
            if (this.collection) {
                this.collection.each(function (dvd) {
                    this.append(dvd);
                }, this);
            }
            return this;
        },
        append: function (dvd) {
            console.log("[View]ListView::append()");
            var item_view = (new ItemView({model: dvd, tagName: "tr"})).render();
            var index = this.collection.indexOf(dvd);
            if (index === 0) {
                this.$el.prepend(item_view.el);
            } else {
                item_view.$el.insertAfter(this.$el.children()[index-1]);
            }
        }
    });
    return ListView;
});