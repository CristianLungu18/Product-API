const express = require("express");
require("dotenv").config();
require("express-async-errors");
const Product = require("./model/product");
const productData = require("./dev-data/products");
const connectDB = require("./config/database");
const productRoutes = require("./routes/product");

const app = express();

const errorHandleMiddleware = require("./middleware/error-handler");

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES

app.use("/api/v1/products", productRoutes);

//products route
app.use(errorHandleMiddleware);
app.use("*", (req, res, next) => {
  res.send("This route does not exist!");
});

//SYNC DATA FROM DEV-DATA FILE
// Product.collection.drop();
// Product.insertMany(productData);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
