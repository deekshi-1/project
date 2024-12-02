require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT||5000;
const dbConnection = require('./config/dbConnect')
const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute');
const bodyParser = require('body-parser');
const {errorHandler,notFound}= require('./middleware/errorHandler')
const cookie = require('cookie-parser');


const app = express();
dbConnection();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookie());

app.use("/api/user",authRoute);
app.use("/api/product",productRoute);
app.use("/api/category",categoryRoute);

app.use(notFound);
app.use(errorHandler)


app.listen(PORT,()=>console.log(`Server Running in port ${PORT} `))

