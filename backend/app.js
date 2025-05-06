const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");
require("dotenv").config();
require("./connection/conn");
const User = require("./routes/user");
const Product = require("./routes/product");
const Pdf = require("./routes/pdf");
const Order = require("./routes/cart");


app.use(cors());
//routes
app.use("/api/v1",User);
app.use("/api/v1",Product);
app.use("/api/v1",Pdf);
app.use("/api/v1",Order);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("hello from backend");
});
//port
app.listen(process.env.PORT, () => {
    console.log(`listening ${process.env.PORT}`);
})