function getStockPath(order) {
	return `portfolios/${order.uid}/stocks/${order.ticker}`;
}

function getOrderCost(order, price) {
	return order.quantity * price;
}

export function buyOrder(db, order, price, timestamp) {
	const orderCost = getOrderCost(order, price);

	return db.doc(`portfolios/${order.uid}`).get().then(data => {
		const { cash } = data.data();
		if (cash < orderCost) throw "Insufficient funds";
		else {
			return db.doc(`portfolios/${order.uid}`).update({
				cash: cash - orderCost
			});
		}
	}).then(() => {
		const updateOrder = db.doc(`transactions/${order.id}`).update({
			fulfilled: true,
			price,
			timestamp: Date.now(),
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
				} else {
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

export function sellOrder(db, order, price, timestamp) {
	const orderCost = getOrderCost(order, price);
	const stockPath = getStockPath(order);

	return db.doc(stockPath).get().then(data => {
		if (!data.exists) throw "Not enough shares";
		const { quantity } = data.data();
		if (quantity < order.quantity) throw "Not enough shares";
	}).then(() => {
		const updatePortfolio = db.doc(`portfolios/${order.uid}`).get().then(data => {
			const { cash } = data.data();
			return db.doc(`portfolios/${order.uid}`).update({
				cash: cash + orderCost
			});
		});

		const updateOrder = db.doc(`transactions/${order.id}`).update({
			fulfilled: true,
			price,
			timestamp: Date.now(),
			fulfillmentTimestamp: timestamp
		});

		const updateStocks = db.doc(stockPath).get()
			.then(data => {
				let stock = data.data();
				if (stock.quantity == order.quantity) {
					// Sold all stocks, have to remove ticker entirely
					return db.doc(stockPath).delete();
				} else {
					return db.doc(stockPath).update({
						quantity: stock.quantity - order.quantity,
						purchaseValue: (stock.purchaseValue * (stock.quantity - order.quantity))/stock.quantity
					});
				}
			});

		return Promise.all([updateOrder, updateStocks]);
	});
}

export function shortOrder(db, order, price, timestamp) {
	return Promise.reject("Not yet implemented: shorts");
}

export function limitOrder(db, order, price, timestamp) {
	return Promise.reject("Not yet implemented: limits");
}

export function onError(db, order, error) {
	return db.doc(`transactions/${order.id}`).update({
		fulfilled: true,
		timestamp: Date.now(),
		error
	});
}
