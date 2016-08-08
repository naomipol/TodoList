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

  listcollection.update({_id: '579d812a71a7d95889b4cb3c'}, {$push: {items: item}});

  res.send(item);
});

router.put('/', function(req, res, next) {
  var item = req.body;
  console.log(item);
  var db = req.db;
  var listcollection = db.get('listcollection');
  listcollection.update({_id: '579d812a71a7d95889b4cb3c', 'items.id': item.id}, {$set: {'items.$': item}});

  res.send(item);
});

router.put('/title', function(req, res, next) {
  var title = req.body.text;
  console.log(title);
  var db = req.db;
  var listcollection = db.get('listcollection');
  listcollection.update({_id: '579d812a71a7d95889b4cb3c'}, {$set: {'title': title}});

  res.send(title);
});

router.delete('/', function(req, res, next) {
  var item = req.body;
  console.log(item);
  var db = req.db;
  var listcollection = db.get('listcollection');
  listcollection.update({_id: '579d812a71a7d95889b4cb3c'}, {$pull: {items: {id: item.id}}});

  res.send(item);
});

// router.post('/all', function(req, res, next) {
//   var items = req.body;
//   console.log(items);
//   var db = req.db;
//   var listcollection = db.get('listcollection');

//   listcollection.find({ _id: '579d812a71a7d95889b4cb3c' }).forEach(function (doc) {
//     doc.items.forEach(function (item) {
//       item.comlpete = true;
//     });
//     db.listcollection.save(doc);
//     res.send(doc.items);
//   });

//   //listcollection.update({_id: '579d812a71a7d95889b4cb3c'}, {$set: {items: items}});

  
// });

module.exports = router;
