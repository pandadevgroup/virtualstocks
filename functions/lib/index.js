"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
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
    admin.firestore().doc(`users/${id}`).set({
        id, name, email
    });
});
//# sourceMappingURL=index.js.map