require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
const router = require("./src/routers");
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server running at https://localhost ${PORT}`);
});
