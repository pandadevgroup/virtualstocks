"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStockPath(order) {
    return `portfolios/${order.uid}/stocks/${order.ticker}`;
}
function getOrderCost(order, price) {
    return order.quantity * price;
}
function buyOrder(db, order, price, timestamp) {
    const orderCost = getOrderCost(order, price);
    return db.doc(`portfolios/${order.uid}`).get().then(data => {
        const { cash } = data.data();
        if (cash < orderCost)
            throw "Insufficient funds";
        else {
            return db.doc(`portfolios/${order.uid}`).update({
                cash: cash - orderCost
            });
        }
    }).then(() => {
        const updateOrder = db.doc(`orders/${order.id}`).update({
            fulfilled: true,
            price,
            fulfillmentTimestamp: timestamp
        });
        const stockPath = getStockPath(order);
        const updatePortfolio = db.doc(stockPath).get()
            .then(data => {
            if (!data.exists) {
                // Ticker doesn't exist, create it now
                return db.doc(stockPath).set({
                    ticker: order.ticker,
                    quantity: order.quantity,
                    purchaseValue: price * order.quantity
                    // TODO: Company name
                });
            }
            else {
                let stock = data.data();
                // Ticker already exists, just update
                return db.doc(stockPath).update({
                    quantity: stock.quantity + order.quantity,
                    purchaseValue: stock.purchaseValue + price * order.quantity
                    // TODO: Company name
                });
            }
        });
        return Promise.all([updateOrder, updatePortfolio]);
    });
}
exports.buyOrder = buyOrder;
function sellOrder(db, order, price, timestamp) {
    const orderCost = getOrderCost(order, price);
    return db.doc(`portfolios/${order.uid}`).get().then(data => {
        const { cash } = data.data();
        return db.doc(`portfolios/${order.uid}`).update({
            cash: cash + orderCost
        });
    }).then(() => {
        const updateOrder = db.doc(`orders/${order.id}`).update({
            fulfilled: true,
            price,
            fulfillmentTimestamp: timestamp
        });
        const stockPath = getStockPath(order);
        const updatePortfolio = db.doc(stockPath).get()
            .then(data => {
            let stock = data.data();
            if (stock.quantity == order.quantity) {
                // Sold all stocks, have to remove ticker entirely
                return db.doc(stockPath).remove();
            }
            else {
                return db.doc(stockPath).update({
                    quantity: stock.quantity - order.quantity,
                    purchaseValue: stock.purchaseValue - (stock.purchaseValue * (stock.quantity - order.quantity)) / stock.quantity
                });
            }
        });
        return Promise.all([updateOrder, updatePortfolio]);
    });
}
exports.sellOrder = sellOrder;
function shortOrder(db, order, price, timestamp) {
    return Promise.reject("Not yet implemented: shorts");
}
exports.shortOrder = shortOrder;
function limitOrder(db, order, price, timestamp) {
    return Promise.reject("Not yet implemented: limits");
}
exports.limitOrder = limitOrder;
//# sourceMappingURL=orders.js.map