require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT||5000;
const dbConnection = require('./config/dbConnect')
const authRoute = require('./routes/authRoute');
const bodyParser = require('body-parser');
const {errorHandler,notFound}= require('./middleware/errorHandler')



const app = express();
dbConnection();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use("/api/user",authRoute);

app.use(notFound);
app.use(errorHandler)


app.listen(PORT,()=>console.log(`Server Running in port ${PORT} `))

