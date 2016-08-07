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

  listcollection.update({_id: '5794572dc70e2d578eff037d'}, {$push: {items: item}});

  res.send(item);
});

router.put('/', function(req, res, next) {
  var item = req.body;
  console.log(item);
  var db = req.db;
  var listcollection = db.get('listcollection');
  listcollection.update({_id: '5794572dc70e2d578eff037d', 'items.id': item.id}, {$set: {'items.$': item}});

  res.send(item);
});

// router.post('/all', function(req, res, next) {
//   var items = req.body;
//   console.log(items);
//   var db = req.db;
//   var listcollection = db.get('listcollection');

//   listcollection.find({ _id: '5794572dc70e2d578eff037d' }).forEach(function (doc) {
//     doc.items.forEach(function (item) {
//       item.comlpete = true;
//     });
//     db.listcollection.save(doc);
//     res.send(doc.items);
//   });

//   //listcollection.update({_id: '5794572dc70e2d578eff037d'}, {$set: {items: items}});

  
// });

module.exports = router;
