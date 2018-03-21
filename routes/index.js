const Article = require('../models/Article');
const request = require('request');
const cheerio = require('cheerio');


module.exports = app => {
    app.get('/', (req, res) => {
        Article.find({}, function (error, articles) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('articles', articles);
                res.render('index', { articles });
            }
        });

    });

    app.get('/scrape', (req, res) => {
        request("https://www.brightsideofthesun.com", function (error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            let $ = cheerio.load(html);
            $("h2.c-entry-box--compact__title").each(function (i, element) {

                // An empty array to save the data that we'll scrape
                let results = {};

                // saving the link and title to the results object
                results.link = $(element).children().attr("href");
                results.title = $(element).text();
                
                // Create a new of entry of the Article model and pass in the results object
                let entry = new Article(results);
                entry.save((err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Insert successful');
                    }
                });
                if (i === 20) {
                    console.log('Scrape complete.');
                    return false;
                }
            });

        });
    });
};