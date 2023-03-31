const mongoose = require("mongoose");
const main = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://mrsohelsyed:sohel@cluster0.rfiblz6.mongodb.net/product?retryWrites=true&w=majority"
  );
  console.log("connected to database");
};

module.exports = main;
