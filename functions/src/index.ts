import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const server = express();
server.use(bodyParser.json());

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const initializeUser = functions.auth.user().onCreate(event => {
	const user = event.data;
	const id = user.uid;
	const name = user.displayName;
	const email = user.email;

	const createUser = db.doc(`users/${id}`).set({
		id, name, email
	});

	const createPortfolio = db.doc(`portfolios/${id}`).set({
		stocks: [],
		value: 100000,
		cash: 100000
	});

	return Promise.all([createUser, createPortfolio]);
});

server.post("/update", (req, res) => {
	const order = req.body.order;
	const price = req.body.price;
	const timestamp = req.body.timestamp;

	const deleteOrder = db.doc(`orders/${order.id}`).update({
		fulfilled: true,
		price,
		fulfillmentTimestamp: timestamp
	});

	const stockPath = `portfolios/${order.uid}/stocks/${order.ticker}`;
	const addToPortfolio = db.doc(stockPath).get()
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

	Promise.all([deleteOrder, addToPortfolio])
		.then(() => res.send("OK"))
		.catch(error => {
			res.status(500).send("Error\n" + error);
		});
});

export const orders = functions.https.onRequest(server);
