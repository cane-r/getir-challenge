const app = require("./server");
const db = require("./database/connector");
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server is started on port ${PORT}`);
  db.connect();
});
 