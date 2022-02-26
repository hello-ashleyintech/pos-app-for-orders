var express = require("express");
require("dotenv").config();
var router = express.Router();
const { Serialized } = require("@serialized/serialized-client");
const OrderClient = require("../order-client");

const serializedClient = Serialized.create({
  accessKey: process.env.SERIALIZED_ACCESS_KEY,
  secretAccessKey: process.env.SERIALIZED_SECRET_ACCESS_KEY,
});
const orderClient = new OrderClient(serializedClient);

router.post("/create", async function (req, res, next) {
  const { orderId } = req.body;
  console.dir(req.body);
  try {
    var response = await orderClient.createOrder(orderId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
