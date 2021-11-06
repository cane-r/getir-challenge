const express = require('express');
const app = express();
const recordsroutes = require('./routes/recordshandler');

app.use(express.json())
app.use('/records', recordsroutes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json(`An error happened.Cause : ${err.message}`)
  } else {
    next() //pass the request to routers chain..
  }
});

module.exports = app;