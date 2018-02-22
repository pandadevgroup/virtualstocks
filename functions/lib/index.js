"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
admin.initializeApp(functions.config().firebase);
const server = express();
server.use(bodyParser.json());
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.initializeUser = functions.auth.user().onCreate(event => {
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
    const orderId = req.body.order_id;
    const price = req.body.price;
    const timestamp = req.body.timestamp;
    res.send(`Order ID: ${orderId}. Price: ${price}. Timestamp: ${timestamp}.`);
});
exports.orders = functions.https.onRequest(server);
//# sourceMappingURL=index.js.map