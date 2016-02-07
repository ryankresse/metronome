var mongoose = require('mongoose');

var conn;

function getConn(callback) {
	if (conn) return conn;
	
	conn = mongoose.connect('mongodb://localhost/metro');

	mongoose.connection.on('open', function(){
		console.log('connection opened');
	});
		
	mongoose.connection.on('error', console.log.bind(console));
	
	callback();	
}

process.on('SIGINT', function() {  
 mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 


module.exports = {getConn: getConn};