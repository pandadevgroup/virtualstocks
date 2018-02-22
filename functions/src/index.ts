import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
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

	const createUser = admin.firestore().doc(`users/${id}`).set({
		id, name, email
	});

	const createPortfolio = admin.firestore().doc(`portfolios/${id}`).set({
		stocks: [],
		value: 100000,
		cash: 100000
	});

	return Promise.all([createUser, createPortfolio]);
});

server.post("/update", (req, res) => {
	const orderId = req.body.orderId;
	const price = req.body.price;
	const timestamp = req.body.timestamp;

	res.send(`Order ID: ${orderId}. Price: ${price}. Timestamp: ${timestamp}.`);
});

export const orders = functions.https.onRequest(server);
