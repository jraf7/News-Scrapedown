let express = require("express");
let mongoose = require("mongoose");

let PORT = 3000;
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/onion-peeler";
mongoose.connect(MONGODB_URI);

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

app.listen(PORT, function () {
    console.log("============================");
    console.log(`ATTENTION: The Onion Peel is currently operating on: ${PORT}!`);
    console.log("============================");
})