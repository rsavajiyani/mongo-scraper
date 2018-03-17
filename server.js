// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");
const exphbs = require('express-handlebars');

// Requiring our Note and Article models
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");

mongoose.Promise = Promise;

// Initialize Express
const app = express();
var PORT = process.env.PORT || 3000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper", {
    useMongoClient: true
});
const db = mongoose.connection;
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function () {
    console.log("Mongoose connection successful.");
});

// Setup Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Connect to routes
require('./routes/index.js')(app);


app.listen(PORT, function () {
    console.log("App running on port 3000!");
});