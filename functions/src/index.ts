import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as fromOrders from "./orders";

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

	let createUser;
	if (user.displayName) {
		// Signed in with Google+ / Facebook

		const name = user.displayName;
		const email = user.email;

		createUser = db.doc(`users/${id}`).set({
			id, name, email
		});
	}

	const createPortfolio = db.doc(`portfolios/${id}`).set({
		stocks: [],
		value: 100000,
		cash: 100000
	});

	return Promise.all([createUser, createPortfolio]);
});

server.post("/update", (req, res) => {
	const { order, price, timestamp } = req.body;
	const { type } = order;

	let promise;
	switch (type) {
		case "buy":
			promise = fromOrders.buyOrder(db, order, price, timestamp);
			break;
		case "sell":
			promise = fromOrders.sellOrder(db, order, price, timestamp);
			break;
		case "short":
			promise = fromOrders.shortOrder(db, order, price, timestamp);
			break;
		case "limit":
			promise = fromOrders.limitOrder(db, order, price, timestamp);
			break;
	}

	promise.then(() => res.send("OK"))
		.catch(error => {
			res.status(500).send(error);
			fromOrders.onError(db, order, error);
		});
});

export const orders = functions.https.onRequest(server);
