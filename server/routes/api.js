const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;

var url = "mongodb://caominhhung1991:Hung1991@ds123182.mlab.com:23182/myphamonline";
// Connect
const connection = (closure) => {
	return MongoClient.connect('mongodb://caominhhung1991:Hung1991@ds123182.mlab.com:23182/myphamonline', (err, db) => {
		if (err) return console.log(err);
		closure(db);
	})
};

// Error handling
const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response = {
	status: 200, data: [], message: null
}

// GET theo Name
router.get('/mon/:name', (req, res) => {
    console.log("get products api");
    response.data = [{Hung: 'asdad'}];
    response.message = 'dsdsdsdsd';
	res.json(response);
    // console.log(req.body);
})

// POST thêm câu hỏi theo môn
router.post('/mon/:name', (req, res) => {
	var quest = req.body;
	console.log(quest);
	connection((db) => {
		db.collection(req.params.name).save(quest, (err, quest) => {
			if(err) {
				res.send(err);
			}
			res.json(quest);
		})
	})
})

// Add product
router.post('/product', (req, res, next) => {
	var task = req.body;
	console.log("add product api");
	connection((db) => {
		db.collection('product').save(task, (err, task) => {
			if (err) {
				res.send(err);
			}
			res.json(task);
		});
	});
})
 
module.exports = router;