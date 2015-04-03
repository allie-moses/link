var db = require("./models")
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

// var id = hashids.encode(show);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))

app.set("view engine", "ejs")

app.get("/",function(req,res){
  res.render('index');
});

app.post('/show',function(req,res){
  // articleList.push({title:req.body.title,body:req.body.body});
  // articleList.push(req.body);

  db.link.findOrCreate({where: { url: req.body.q,}})
  .spread(function(link, created) {
    console.log(link) // returns info about the user
    var hash = hashids.encode(link.id)
    //for and if else^^^^
    res.render('show',{hash:hash});
    link.hash = hash
    link.save()
  })

});

app.get("/:hash",function(req,res){
  var id = parseInt(hashids.decode(req.params.hash))
  db.link.find(id).then(function(link)
    {res.redirect('http://'+link.url)})
})


app.listen(process.env.PORT || 3000, function() {
  "App is listening on port 3000"
});