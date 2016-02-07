var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var router = express.Router();
var musicController = require('../controllers/music-controller')

router.use(jsonParser);

router.route('/')
	.get(function(req, res) {
	
    musicController.loadAllCategories()
    .then(function(musicData){
      res.json(musicData);
    })
    .catch(function(reason){
    	console.log(reason);
      handleError(res, reason);
    });
});

router.post('/createCategory', function(req, res) {
  musicController.createCategory(req.body.data)
    .then(function(id){
    console.log(id);
      res.json(id);
    })
    .catch(function(reason){
      handleError(res, reason);
    });
});

router.post('/createEntry', function(req, res) {
  musicController.createEntry(req.body.data.categoryId, req.body.data.entryName)
    .then(function(id){
      res.json(id);
    })
    .catch(function(reason){
    	console.error(reason);
      handleError(res, reason);
    });
});

router.post('/updateRecent', function(req, res) {
  musicController.updateRecent(req.body.data.catId, req.body.data.entryId, req.body.data.speed)
    .then(function(data){
      res.send(data);
    })
    .catch(function(reason){
      handleError(res, reason);
    });
});

router.post('/updateFastest', function(req, res) {
  musicController.updateFastest(req.body.data.catId, req.body.data.entryId, req.body.data.speed)
    .then(function(data){
      res.status(200).send();
    })
    .catch(function(reason){
    console.error(reason);
      handleError(res, reason);
    });
});

router.post('/deleteCat', function(req, res) {
  musicController.deleteCat(req.body.data.catId)
    .then(function(data){
      res.status(200).send();
    })
    .catch(function(reason){
      handleError(res, reason);
    });
});

router.post('/deleteEntry', function(req, res) {
  musicController.deleteEntry(req.body.data.catId, req.body.data.entryId)
    .then(function(data){
      res.status(200).send();
    })
    .catch(function(reason){
      console.error(reason);
      handleError(res, reason);
    });
});

function handleError (res, reason) {
  res.status(500).send('Something went wrong')
}


module.exports = router;
