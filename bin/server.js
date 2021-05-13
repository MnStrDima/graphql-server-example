const server = require("../app");
const db = require("../model/db");

db.then(server).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
});
