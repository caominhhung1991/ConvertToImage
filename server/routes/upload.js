var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

const dir = './uploads/';

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		console.log(file);
		if(!fs.existsSync(dir+file.fieldname)) {
			fs.mkdirSync(dir+file.fieldname);
		} 
		cb(null, `uploads/${file.fieldname}`)
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})

var upload = multer({storage: storage});
// router.get

router.post('/photos', upload.any(), function (req, res, next) {
	console.log(req.files);
	console.log('API upload photos');
	res.send(req.files);
})

// router.post('/doc', upload.any(), function (req, res, next) {
// 	console.log('API upload photos');
// 	res.send(req.files);
// })

module.exports = router;
