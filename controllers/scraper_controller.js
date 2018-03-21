var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/");
var cheerio = require("cheerio");
var request = require("request");
var rp = require('request-promise');
var Article = require("../models/Articles.js");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoooo";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});


router.get("/", (req, res) => {
    res.render("index")
});

router.get("/myarticles", function(req, res){
    db.Article.find({}).then(function(myarticles){
        console.log(myarticles)
    })
})

router.post("/saved", function(req, res){
    console.log(req.body)

    Article.create(req.body).then(createdArticle =>{
        console.log(createdArticle)
    })
})

router.get("/scraper", function(req, res) {
    request("https://www.reddit.com/r/learnprogramming", function(error, response, html) {

        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);

        // An empty array to save the data that we'll scrape
        var results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("p.title").each(function(i, element) {

            // Save the text of the element in a "title" variable
            var title = $(element).text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children().attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: "https://www.reddit.com" + link
            });
        });

        let handlebarsObj = {
            id: req.body._id,
            artArray: results
        }

        res.render("articles", handlebarsObj)


    });
})
module.exports = router;
