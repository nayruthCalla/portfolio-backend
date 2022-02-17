const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.DB_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Conection to DB is succesfull 💪!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = ConnectDB;
