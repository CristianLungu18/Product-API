const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.get("/", productController.getAllProducts);

module.exports = router;
