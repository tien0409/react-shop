const mongoose = require("mongoose");
const { MONGO_URL } = require("../configs/env");

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log("Connect database success");
  } catch (err) {
    console.error(`Error connect database.\n${err.message}`);
    process.exit(-1);
  }
};

module.exports = connectDb;
