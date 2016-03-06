/**
 * 一覧のコレクション
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'backbone',
    'backbone.localStorage',
    '..//models/Dvd'
], function(Backbone, LocalStorage, Dvd){
    var DvdList = Backbone.Collection.extend({
        //localStorage: new LocalStorage('dvd'),
        model: Dvd,

        url: function() {
            return "/DvdREST/webresources/dvd?"
                + "searchBuyDateFrom=" + this.options.searchBuyDateFrom
            + "&searchBuyDateTo=" + this.options.searchBuyDateTo
            + "&searchNotes=" +  this.options.searchNotes
            + "&searchKamokuid=" +  this.options.searchKamokuid
            + "&searchConsumer=" +  this.options.searchConsumer
            + "&searchPayer=" +  this.options.searchPayer;
        },

        comparator: function(dvd){
            return dvd.index();
        },
        initialize: function(models, options) {
            console.dir("[Collection]DvdList::initialize()");
            this.options = options;
            // イベント購読
            this.listenTo(this.collection, 'add', this.append);
            this.listenTo(this, 'onFetch', this._onFetch);
        },
        parse : function parse(res) {    // modelにsetする値を指定する
            console.dir("[Collection]DvdList::parse()");
            return res;
        },
        _onFetch : function _onFetch() {    // 追記
            // fetch()が終わった後の処理を書く
            console.dir("[Collection]DvdList::_onFetch()");
        }
    });
    return DvdList;
});