fs = require('fs');
const config = require(`${__dirname}/../config/config.js`);
// Configuring the database
const mongoose = require('mongoose');
const mongooseDb = {};

mongoose.Promise = global.Promise;

let connectObject = {keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000, useNewUrlParser: true };

// if(config.dbMongooseSSLCert != "" && !fs.existsSync(config.dbMongooseSSLCert)){
//     console.log("unable to access mongo cert file: " + config.dbMongooseSSLCert);
//     process.exit();
// }
// else if( config.dbMongooseSSLCert != "" && fs.existsSync(config.dbMongooseSSLCert))
// {
//     connectObject.sslValidate = true;
//     connectObject.sslCA=fs.readFileSync(config.dbMongooseSSLCert,'utf8');
// }

// Connecting to the database
mongoose.connect(config.dbMongoose, connectObject).then(() => {
    console.log("Successfully connected to the MongoDB");
}).catch(err => {
    console.log('Could not connect to the MongoDB. Exiting now...', err);
    process.exit();
});

mongooseDb.users = require('../mongomodels/user.js');

module.exports = mongooseDb;