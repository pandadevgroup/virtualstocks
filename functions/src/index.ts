import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

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
