var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db');
var express = require('express');
var app = express();
const str = require('./data.json');

//Insert Document
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = JSON.parse(JSON.stringify(str));
    dbo.collection("Students").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});

//Create Model
var StudentSchema = mongoose.Schema({
    id: String,
    fname: String,
    lname: String,
    Birthday: Date,
    Sex: String,
    Class: String
});
var Student = mongoose.model("Student", StudentSchema);
//ODM
app.post('/addStudent', function(req, res) {
    // First read existing student.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        var idStudent = req.query.idStudent;
        var fname = req.query.fname;
        var lname = req.query.lname;
        var Birthday = req.query.Birthday;
        var Sex = req.query.Sex;
        var Class = req.query.Class;
        var student4 = {
            "idStudent": "17047951",
            "fname": "Phong",
            "lname": "Phan",
            "Birthday": "17/03/1999",
            "Sex": "Nam",
            "class": "DHCNTT13A"
        }
        data["student4"] = student["student4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
//Update 
app.put('/student/update/:id', function(req, res) {
    Student.findOne({ idStudent: req.params.id }, { fname: "Phong" }, function(err, response) {
        if (err) res.json({ message: "Error in updating person with id " + req.params.id });
        res.json(response);
    });
});
//find student with id student and output name
app.get('/student/find/:id', function(req, res) {
    console.log(req.params.id);
    Student.findOne({ idStudent: req.params.id }, function(err, response) {
        console.log(response);
        res.send(response);
    });
});
//delete student with id
app.delete('/student/delete/:id', function(req, res) {

    Student.findOne({ idStudent: req.params.id }, function(err, response) {
        if (err) res.json({ message: "Error in deleting record id " + req.params.id });
        else res.json({ message: "Person with id " + req.params.id + " removed." });
    });
});
app.listen(8080);