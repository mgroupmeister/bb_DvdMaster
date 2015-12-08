/**
 * Created by tetsuya.matsuura on 2015/11/10.
 */
define([
    'backbone',
    'backbone.localStorage',
    'kakei/models/Kakei'
], function(Backbone, LocalStorage, Kakei){
    var KakeiList = Backbone.Collection.extend({
        //localStorage: new LocalStorage('kakei'),
        model: Kakei,
        //url: '/KakeiREST/webresources/kakei4/?searchBuyDateFrom=2015/11/01&searchBuyDateTo=2015/11/30',

        searchBuyDateFrom: null,
        //setSearchBuyDateFrom: function(param) {
        //    this.set('searchBuyDateFrom', param);
        //},
        searchBuyDateTo: "",
        searchNotes: "",
        searchKamokuid: "",
        searchConsumer: "",
        searchPayer: "",

        url: function() {
            return "/KakeiREST/webresources/kakei4?";
            //    + "searchBuyDateFrom=" + this.options.searchBuyDateFrom
            //+ "&searchBuyDateTo=" + this.options.searchBuyDateTo
            //+ "&searchNotes=" +  this.options.searchNotes
            //+ "&searchKamokuid=" +  this.options.searchKamokuid
            //+ "&searchConsumer=" +  this.options.searchConsumer
            //+ "&searchPayer=" +  this.options.searchPayer;
        },

        comparator: function(kakei){
            return kakei.index();
        },
        //initialize: function(options) {
        //    console.dir("[Collection]KakeiList::initialize()"+ this.options.searchBuyDateFrom);
        //    this.options=options;
        //    // イベント購読
        //    this.listenTo(this.collection, 'add', this.append);
        //    this.listenTo(this, 'onFetch', this._onFetch);
        //},
        initialize: function() {
            console.dir("[Collection]KakeiList::initialize()");
            // イベント購読
            this.listenTo(this.collection, 'add', this.append);
            this.listenTo(this, 'onFetch', this._onFetch);
        },
        parse : function parse(res) {    // modelにsetする値を指定する
            console.dir("[Collection]KakeiList::parse()");
            return res;
            //return res.list;
        },
        _onFetch : function _onFetch() {    // 追記
            // fetch()が終わった後の処理を書く
            console.dir("[Collection]KakeiList::_onFetch()");
        }
    });
    return KakeiList;
});