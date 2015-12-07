define(['marionette','aicj/env' , 'aicj/util/LoggerUtil'], function(Marionette, env, LoggerUtil){
    'use strict';

    LoggerUtil.consoleLogger.debug('[Application]app::loading...');

    // init app ============================================
    var app = new Marionette.Application(
        {
            regions: {mainRegion: '#main-region'}
        }
    );
    app.env = env;
    app.onStart = function() {
        LoggerUtil.consoleLogger.debug('[Application]app::start()');
    };
    window.app = app;

    require([
        'backbone',
        'marionette',
        'jquery',
        'aicj/layouts/base/BaseLayout',
        'aicj/modules/TopModule',
        // ここからプロジェクト毎に設定するモジュール
        'aicj/modules/StockInspectionModule',
        'aicj/modules/FirstDeliveryModule',
        'aicj/modules/AdditionalDeliveryModule',
        'aicj/modules/AdditionalDeliveryConfirmModule',
        'aicj/modules/ItemListModule'
    ], function (Backbone,
                 Marionette,
                 $,
                 BaseLayout,
                 TopModule,
                 // ここからプロジェクト毎に設定するモジュール
                 StockInspectionModule,
                 FirstDeliveryModule,
                 AdditionalDeliveryModule,
                 AdditionalDeliveryConfirmModule,
                 ItemListModule) {

        // user setting =========================================
        // ページ(業務単位)を追加する際には、ここに追加します。
        var usersetting_pages = [
            {
                'title': $.i18n.t("label.stockInspection"), // 上部メニューに出てくるタイトル
                'urltag': 'stockInspection', // URLになるラベル(http://example.com/#hoge のhoge)
                'module': StockInspectionModule // メニューが押された際に呼び出されるモジュール
            },
            {
                'title': $.i18n.t("label.firstDelivery"),
                'urltag': 'firstDelivery',
                'module': FirstDeliveryModule
            },
            {
                'title': $.i18n.t("label.additionalDelivery"),
                'urltag': 'additionalDelivery',
                'module': AdditionalDeliveryModule
            },
            {
                'title': $.i18n.t("label.additionalDeliveryConfirm"),
                'urltag': 'additionalDeliveryConfirm',
                'module': AdditionalDeliveryConfirmModule
            },
            {
                'title': $.i18n.t("label.itemList"),
                'urltag': 'itemList',
                'module': ItemListModule
            }
        ];
        // ======================================================

        // create base layout and bind data =====================
        var baseLayout = new BaseLayout(usersetting_pages);
        baseLayout.usersetting_pages = usersetting_pages;
        app.mainRegion.show(baseLayout);

        // add module ===========================================
        app.module('topModule', TopModule);
        usersetting_pages.forEach(function (page) {
            app.module(page.urltag, page.module);
        });
        app.stopModules = function () {
            app.module('topModule').stop();
            usersetting_pages.forEach(function (page) {
                app.module(page.urltag).stop();
            });
        };

        // set Router ==========================================
        var mainRouter = new (Backbone.Router.extend({routes: {'': 'index'}}))();
        mainRouter.on('route:index',
            function () {
                app.stopModules();
                app.module('topModule').start();

            }
        );
        usersetting_pages.forEach(function (page) {
            mainRouter.route(page.urltag, page.urltag);
            mainRouter.on('route:' + page.urltag,
                function () {
                    app.stopModules();
                    app.module(page.urltag).start();
                }
            );
        });

        // set initializer ======================================
        app.addInitializer(function () {
            Backbone.history.start();
        });
    });
    return app;
});



