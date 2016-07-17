var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var db = req.db;
  var listcollection = db.get('listcollection');
  listcollection.find({},{}, function(e,list) {
    console.log(list);
    res.send(list[0]);
  })
});

router.post('/', function(req, res, next) {
  var text = req.body.text;
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var item = {id: id, text: text, complete: false};
  var db = req.db;
  var listcollection = db.get('listcollection');

  listcollection.update({_id: '578b2cd569d41651d15e3eec'}, {$push: {items: item}});

  res.send(item);
});

module.exports = router;
