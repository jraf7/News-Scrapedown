let db = require("../models");
let cheerio = require("cheerio");
let axios = require("axios");

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        console.log("Scrape Initialized")
        axios.get("https://www.theonion.com/search?blogId=1636079510")
        .then(function (response) {
            let $ = cheerio.load(response.data);
            $("h2").each(function (i, element) {
                let result = {};
                result.title = $(this).text();
                result.link = $(this).parent().attr("href");
                // result.image = $(this).parent().parent().parent().prev().children().children().children().children().attr("srcset");
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err)
                    });                  
            })
            console.log("Scrape Completed")
            res.send("Scrape Complete");
        })
    })

    app.get("/api/articles", function (req, res) {
        db.Article.find({})
            .populate("comments")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    });
    
    app.get("/api/articles/:id", function (req, res) {
        db.Article.find({ _id: req.params.id })
            .populate("comments")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            })
    })

    app.get("/api/articles/saved", function (req, res) {
        db.Article.find( { saved: true})
            .populate("comments")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            })
    });

    app.get("/api/delete/:id", function (req, res) {
        db.Article.remove({
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

    //Post Routez: post id => comments

    app.post("/api/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Note.findOneAndUpdate(
                    { _id: req.params.id},
                    { $push: { note: dbNote._id} },
                    { new: true}
                );
                }
            )
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
    })


} 