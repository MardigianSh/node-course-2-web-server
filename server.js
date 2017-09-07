const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n')
    next();
});

//app.use((req, res, next) => {
  //  res.render('maintenance.hbs')
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (Text) => {
    return Text.toUpperCase();
})

app.get('/', (req, res) => {
   // res.send("<h1>hello express</h1>");
   res.render('home.hbs', {
       titlePage: "Home page",
       welcomeMessage: "welcome to my website"
   });
});

app.get('/about', (req,res) => {
   // res.send("about page");
   res.render('about.hbs', {
       titlePage: "About page"

   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "unable to handle request"
    })
})

app.listen(3020, () =>{
    console.log("SErver is up on port 3020");
});