var express = require('express');
var router = express.Router();
var emplModel = require('../models/employee')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cursor = emplModel.find().cursor();
  var documents = []
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    documents.push(doc)
  }
  console.log(documents)
  res.render('index');
});

module.exports = router;
