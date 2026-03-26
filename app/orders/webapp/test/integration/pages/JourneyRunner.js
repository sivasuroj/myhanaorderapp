sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"orders/test/integration/pages/OrdersList",
	"orders/test/integration/pages/OrdersObjectPage",
	"orders/test/integration/pages/Order_DetailObjectPage"
], function (JourneyRunner, OrdersList, OrdersObjectPage, Order_DetailObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('orders') + '/test/flp.html#app-preview',
        pages: {
			onTheOrdersList: OrdersList,
			onTheOrdersObjectPage: OrdersObjectPage,
			onTheOrder_DetailObjectPage: Order_DetailObjectPage
        },
        async: true
    });

    return runner;
});

