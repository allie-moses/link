var db = require("./models")

// db.link.find({ url: 'google.com'}).then(function(data) {
//   // you can now access the newly created task via the variable data
// })

// db.link
//   .findOrCreate({where: { url: 'stubhub3.com', hash:"hi" }})
//   .spread(function(link, created) {
//     console.log(link) // returns info about the user
//   })

db.link.find({ where: { url: 'stubhub2.com' } }).then(function(link){
  link.destroy().then(function() {})
})