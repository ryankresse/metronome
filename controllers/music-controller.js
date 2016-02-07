var fs = require('fs');
var path = require('path');
var Q = require('q');
var _ = require('lodash');
var Category = require('../models/category');

var musicController = {};

musicController.loadAllCategories = function () {
	return Category.find({}).lean().exec();
	
}
  
musicController.createCategory = function (name) {
	return Category.create({name: name, entries: []})
  		.then(function(cat){
  			return cat.id;
  		});
}

musicController.createEntry = function (catId, entryName) {
 	return Category.findById(catId).exec()
 		.then(function(cat) {
 			cat.entries.push(buildEntry(entryName));
 			return cat.save();
 		})
 		.then(function(cat) {
 			return cat.entries[cat.entries.length - 1]._id;
 		}); 
}


musicController.updateRecent = function (catId, entryId, speed) {
	return Category.findById(catId).exec()
 		.then(function(cat) {
 			var entryToUpdate = cat.entries.id(entryId);
 			entryToUpdate.recent.value = Number(speed);
 			entryToUpdate.recent.date = Date.now();
 			return cat.save();
 		}); 
}

musicController.updateFastest = function (catId, entryId, speed) {
 return Category.findById(catId).exec()
 		.then(function(cat) {
 			var entryToUpdate = cat.entries.id(entryId);
 			entryToUpdate.best.value = Number(speed);
 			entryToUpdate.best.date = Date.now();
 			return cat.save();
 		});
}


musicController.deleteCat = function (catId) {
  return Category.remove({_id: catId}).exec();
}

musicController.deleteEntry = function (catId, entryId) {

  return Category.findById(catId).exec()
 		.then(function(cat) {
 			cat.entries.id(entryId).remove();
 			return cat.save();
 		});
  /*var deferred = Q.defer();
  fS.readFile(MUSIC_FILE, function(err, data) {
    if (err) deferred.reject(err);
    var categories = JSON.parse(data);
    var selectedCategory = _.find(categories, 'id', catId);
    selectedCategory.entries =
    _.without(selectedCategory.entries, (_.find(selectedCategory.entries, 'id', entryId) || {}));

    fs.writeFile(MUSIC_FILE, JSON.stringify(categories, null, 4), function(err) {
      err ? deferred.reject(err) : deferred.resolve(null);
    });
  });
return deferred.promise;*/
}

function buildEntry (name) {
  return {
    name: name,
    best: {
      value: null,
      date: null
    },
    recent: {
      value: null,
      date: null
    }
  }
}


function createEntry(name) {
  _selectedCategory.entries.push(newEntry(name));
}



function createNewCat(name) {
  return {
    id: Date.now(),
    name: name,
    entries: [],
  }
}

module.exports = musicController;
