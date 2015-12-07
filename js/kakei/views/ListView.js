/**
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
            this.collection.each(function (kakei) {
                this.append(kakei);
            }, this);
            return this;
        },
        append: function (kakei) {
            var item_view = (new ItemView({model: kakei, tagName: "tr"})).render();

            var index = this.collection.indexOf(kakei);
            if (index === 0) {
                this.$el.prepend(item_view.el);
            } else {
                item_view.$el.insertAfter(this.$el.children()[index-1]);
            }
        },


        //render: function () {
        //    console.log("[View]KakeiListView::render()");
        //
        //    var list = "<% _.each(items, function(item) { %>"
        //    + "<li id='<%=item.get("id")%>'><%- item.get('buyDate') %></li>"
        //    + "<% })%>";
        //    var compiled = _.template(list);
        //
        //    this.$el.html(compiled({items: this.collection}));
        //    //this.collection.each(function (model) {
        //    //    this.append(model);
        //    //}, this)
        //    return this;
        //}
        //append: function (model) {
        ////    var index = this.collection.indexOf(model);
        //    itemView = new ItemView({model: model}).render();
        //}
    });
    return ListView;
});