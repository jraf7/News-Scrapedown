let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");
let db = require("./models");
let PORT = 3000;
let app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";
mongoose.connect(MONGODB_URI);

//API Routes
//Get Routes: all posts, posts id

app.get("/", function (req, res){
    res.sendFile("./public");
})

app.get("/scrape", function (req, res) {
    axios.get("https://www.theonion.com/").then(function (response) {
        let $ = cheerio.load(response.data);
        $("section a").each(function (i, element) {
            let result = {};
            result.title = $(this).attr("title");
            result.link = $(this).attr("href");
            result.image = $(this).children("img").attr("src");

            db.Article.create(result)
                .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                .catch(function (err) {
                        console.log(err)
                    });
        })
        res.send("Scrape Complete");
    })
})

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        })
});

app.get("/delete/:id", function(req, res){
    db.Article.remove(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        function (error, remove) {
            if (error) {
                res.json(error);
                console.log(error);
            } else {
                console.log(remove);
                res.json(remove);
            }
        }
    )
});


app.put("/saved/:id", function (req, res) {
    db.Article.update(
        {
            _id: mongojs.ObjectID(req.params.id)
        },
        {
            $set: {
                saved: true
            }
        }
    )
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err)
    })
})

app.get("/saved", function (req, res) {
    db.Article.find({})
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(err){
            res.json(err);
        })
});

//Post Routez: post id => comments
app.post("/comment", function (req, res) {
    db.Note.create(req.body)
        .then(function(dbNote){
            res.json(dbNote)
        }
        .catch(function(err){
            res.json(err)
        })
    )
})

app.listen(PORT, function () {
    console.log("============================");
    console.log(`ATTENTION: The Onion Peel is currently operating on: ${PORT}!`);
    console.log("============================");
})