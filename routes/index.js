var express = require('express');
var router = express.Router();
var emplModel = require('../models/employee')


/* GET home page. */
router.get('/',  async function(req, res, next) {
  const cursor = emplModel.find().cursor();
  let documents = []
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    documents.push(doc)
  }
  res.render('index', {data: documents})
})

router.get('/delete/:id', async (req,res) => {
  try
  {
    const { id } = req.params;
    const employee = await emplModel.findOneAndDelete({_id: id})
    const cursor = emplModel.find().cursor();
    let documents = []
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      documents.push(doc)
    }
    res.render('index', {deleted: employee, data: documents})
  }
  catch (e) {
    console.log(e)
  }
})

module.exports = router;
