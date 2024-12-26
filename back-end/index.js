require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const URL = process.env.BASE_URL || "http://localhost:3000";
const dbConnection = require("./config/dbConnect");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/barndRoute");

const productRoute = require("./routes/productRoute");
const bodyParser = require("body-parser");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const cookie = require("cookie-parser");

const app = express();
app.use(cors());
app.use(
  cors({
    origin: `${URL}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dbConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running in port ${PORT} `));
