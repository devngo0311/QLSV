var MongoClient = require('mongodb').MongoClient;
const myDbName = "qlsvDatabase";
const tableName = "students";
var url = "mongodb://localhost:27017/";
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/'+ myDbName);
var express = require('express');
var app = express();
const str = require('./data.json');
app.use(express.json())
var dbo = null;

//Insert Document
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db(myDbName);
    var myobj = JSON.parse(JSON.stringify(str));
    dbo.admin().listDatabases().then(listDB => {
		let isExsit = false;
		listDB.databases.forEach((object) => {
			if (object.name === myDbName) {
				console.log("Vãi lồn luôn có rồi mà???");
				isExsit = true;
			}
		});
		if (!isExsit) {
			dbo.collection(tableName).insertOne(myobj, function(err, res) {
				if (err) throw err;
				console.log("Đã thêm vào 1 cái lồn gì đó đéo biết???");
				db.close();
			});
		}
    });
});

//Create Model
var StudentSchema = mongoose.Schema({
    mssv: String,
    fist_name: String,
    last_name: String,
    birthday: Date,
    sex: String,
    class: String
});
var Student = mongoose.model(tableName, StudentSchema);
app.get('/student/:id', function(req, res) {
	dbo.collection(tableName).findOne({mssv: req.params.id}, function(err, result) {
        if (err) {
			res.json({status: 500, message: "Internal Server", data: err});
		} else {
			res.json({status: 200, message: "SUCCESS", data: result});
		}
	})
});
app.listen(3000);