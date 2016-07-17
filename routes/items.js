var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send({title: 'Todos form server...', items: {dd2323ds: {id: 'dd2323ds', text: 'learn react', complete: false}, dsfd443: {id: 'dsfd443', text: 'learn all the nodes', complete: true}}});
});

router.post('/', function(req, res, next) {
  var text = req.body.text;
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  //console.log(text);
  var item = {id: id, text: text, complete: false};
  //console.log(item);
  res.send(item);
})

module.exports = router;
