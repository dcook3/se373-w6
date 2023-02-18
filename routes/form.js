var emplModel = require('../models/employee')
var express = require('express');
var router = express.Router();

//Create Routes
router.get('/', function(req, res, next) {
	res.render('form', {title: "Add Employee"});
});

router.post('/', async function (req, res) {
	try
	{
		const {firstName, lastName, department, jobTitle, salary} = req.body
		var startDate = new Date(req.body.startDate)
		const { _id } = await emplModel.create({
			firstName,
			lastName,
			department,
			startDate,
			jobTitle,
			salary
		});
		res.redirect(`/addEmployee/${_id}`)
	}
	catch(e) {
		console.log(e)
		res.render('index', {title: "Add Employee", failed: true})
	}
})

//Update Routes
router.get('/:id', async function(req, res, next) {
	const { id } = req.params;
	const data = await emplModel.findById(id);
	date = data.startDate.toISOString().substring(0,10);
	res.render('update', {title: "Update Employee", data:data, date: date});
});

router.post('/:id', async (req, res) => {
	try
	{
		const { id } = req.params;
		const {firstName, lastName, department, jobTitle, salary} = req.body
		var startDate = new Date(req.body.startDate)
		await emplModel.updateOne({_id: id}, {
			firstName,
			lastName,
			department,
			startDate,
			jobTitle,
			salary
		});
		res.render('update', {title: "Update Employee"})
	} catch(e) {
		console.log(e)
		res.render('update', {title: "Update Employee"})
	} finally {
		res.render('form', {title: "Add Employee"})
	}
})

module.exports = router;