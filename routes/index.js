var express = require('express');
var fs =      require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('travel.html', { root: 'public' } );
});



router.get('/getcity', function(req, res, next) {
  console.log("In getcity route");
  fs.readFile(__dirname + "/cities.txt", function (err, data) {
     if (err) throw err;
     var jsonD = [];
     var regex = new RegExp("^" + req.query.q);
     var cities = data.toString().split("\n");
     if (req.query.q != "") {
       for(var i = 0; i < cities.length; i++) { 
         var res = cities[i].search(regex);
         if (res != -1) {
           console.log(cities[i]); 
           jsonD.push({city:cities[i]});
         }
       }
     }
     this.r.send(200, jsonD);


  }.bind( {r: res}));
});

router.get('/getnote', function(req, res, next) {
   
  fs.readFile(__dirname + "/note.txt", function(err,data) {
     if (err) throw err;    
     this.r.send(200, data.toString());
  }.bind( {r : res}));

});

router.post('/setnote', function(req, res, next) {
    fs.writeFile(__dirname + "/note.txt", req.body.q, function(err) {
           if (err) throw err;
           fs.readFile(__dirname + "/note.txt", function(err,data) {
              this.r.send(200, data.toString());
           }.bind( {r : res}));
    });
    
});

module.exports = router;
