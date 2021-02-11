const express = require("express");
const cors = require("cors");
const app = express();
const googleAuth = require("./googleAuth");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ada-dashboard-dde9a-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/signin", async (req, res) => {
  const data = await googleAuth(req.body.id_token);
  const userRef = await db.collection("users");
  const result = await userRef.where("sub", "==", data.sub).get();
  if (result.empty) {
    const newUser = await db.collection("users").add({
      sub: data.sub,
      email: data.email,
      name: data.name,
      givenName: data.given_name,
    });
    return res.json({ message: "result doesn't exist", user: newUser });
  } else {
    const doc = result.docs[0];

    return res.json({ message: "result already exists", user: doc.data() });
  }
});

app.listen(8000, () => console.log("Server listening on port 8000"));
