const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const routes = require("./routes/index");
const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://rajibstha059:Qi0iaZREBibW1NIT@cluster0.vljghmm.mongodb.net/";

mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("`Connected to the database");
});
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to the database");
//   } catch (err) {
//     console.log(err);
//   }
// }

// run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
