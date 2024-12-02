const mangoose = require("mongoose");
const db = () => {
  try {
    const mongoConnct = mangoose.connect(process.env.MONGO_URL);
    console.log("DB Connection successfull");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports= db;
