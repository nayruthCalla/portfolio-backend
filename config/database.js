const mongoose = require('mongoose');
require('dotenv').config();

const URI =
  'mongodb+srv://nayruthCalla:1xv1HF588jgbvZLw@cluster0.4tiub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
