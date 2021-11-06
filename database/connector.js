const mongoose = require("mongoose");
//MONGO_URL is set by exporting a bash variable.
const url = process.env.MONGO_URL;
const connect = async function() {
  await mongoose.connect(url ,  { useNewUrlParser: true , useUnifiedTopology: true } ).then(
      () => { console.log('Connected to mongodb database..'); },
      err => { console.err('Error while connecting to mongodb database..', err);}
  );
}

const disconnect = async function(callback) {
  await mongoose.disconnect().then(
      () => { console.log('Disconnected from mongodb database..'); },
      err => { console.err('Error while disonnecting from mongodb database..', err);}
  );
}

module.exports = {connect,disconnect}; 