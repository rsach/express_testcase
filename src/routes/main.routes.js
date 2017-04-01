// Import node module
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import save from '../mysql';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage : storage }).array('userPhoto',2);



// Arrow functions
router.route('/')
	  .get( 
	  		(req, res) => {
				fs.readFile('static/index.html',(error,data) => {
					if(error){
						console.log(`Error: file not found`+error);
						res.statusCode = 404;
						res.end();
						return;
					}
					res.end(data);

				});

		})
	  .post((req,res) => {
	  	upload(req,res, err => {
	  		// console.log(req.body);
        	
	  		if(err){
	  			return res.end("Error uploading file ");
	  		}
	  		req.files.map(file => save(file.path))
	  		// req.files.map(file => console.log(file.path))

	  		res.end("file is uploaded");
	  	})
	  })
	  
// Exporting an object as the default import for this module
export default router;
