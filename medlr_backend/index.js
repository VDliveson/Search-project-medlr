require('dotenv').config()

const express = require("express");
const app = express();

const port = process.env.PORT;

var cors = require('cors')

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/store",require('./routes/store'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

const connectToMongo = require("./db");

connectToMongo();
