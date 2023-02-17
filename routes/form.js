var emplModel = require('../models/employee')
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('form', {title: "Add Employee"});
});
router.get('/:id', function(req, res, next) {
	res.render('form', {title: "Update Employee"});
});

router.post('/', async function (req, res) {
	const {firstName, lastName, department, startDate, jobTitle, salary} = req.body
	var date = new Date(startDate).toLocaleString()
	const employee = await emplModel.create({
		firstName,
	 	lastName,
	 	department,
	 	date,
	 	jobTitle,
	 	salary
	});
	res.json(employee)
	
})

module.exports = router;