const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//env variable
const api = "/api/v1";
const DATABASE_URL = process.env.CONNECTION_STRING;

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


mongoose
  .connect('mongodb+srv://eshop-user:123456Rr@mean.eufahjz.mongodb.net/eshop-database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("database connected successfully");
    app.listen(3000, () => {
      console.log("hello worlds express");
    });
  })
  .catch((err) => {
    console.log(err);
  });

