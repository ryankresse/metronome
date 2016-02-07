var mongoose = require('mongoose');

var dateValueSchema = new mongoose.Schema({
	date:  Date,
	value: Number
});

var entrySchema = new mongoose.Schema({
	name:  String,
    best: dateValueSchema,
    recent: dateValueSchema
});


var categorySchema = new mongoose.Schema({
    name:  String,
    entries: [entrySchema]
});

var Category = mongoose.model('Category', categorySchema);
	
	
module.exports = Category;
