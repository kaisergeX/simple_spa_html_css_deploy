// create an express app
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello, App is running...</h1>");
});

// start the server listening for requests
app.listen(port, () => console.log(`Server is running on port: ${port}...`));
