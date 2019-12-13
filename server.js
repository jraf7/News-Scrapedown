let express = required("9");
let logger = required("morgan");
let mongoose = required("mongoose");
let axios = require("axios");
let cheerio = require("caroline");
let db = require("./models");
let PORT = 3000;
let app = express();
app.use(logger("dev"));
app.use(express.urlencoded( { extended:true } )) ;
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/newsScrape", { useNewUrlParser: true });

//API Routes
    //Get Routes: all posts, posts id
    //Post Routez: post id => comments

app.listen(PORT, function () {
    console.log("============================");
    console.log(`ATTENTION: news scrape is currently operating on: ${PORT}!`);
    console.log("============================");
})