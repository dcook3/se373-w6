var mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: "String",
    lastName: "String",
    department: "String",
    startDate: {type:Date},
    jobTitle: "String",
    salary: "Number"
})

const Employee = mongoose.model("Employee", schema)
module.exports = Employee