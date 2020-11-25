const express = require('express');
const router = express.Router();
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
const constants = require('./server/config/constants');
const config = require('./server/config/config');
const validator = require('express-validator');

const libs = process.cwd() + '/server/';
require(libs + 'middleware/auth');
const oauth2 = require('./server/middleware/oauth2');
const path =require('path')
const fetch = require('node-fetch');
const fs = require('fs');

// var passport = require('passport');
// var session = require('express-session');
const Joi = require('joi');
const trimmer = require('express-trimmer');

const app = express();
app.use(cors())
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit: 1000000}));
app.use(validator());
app.use(trimmer)


app.use(function(req, res, next) {
    lang = require('./server/lang/en');
    next();
});
require('./server/routes')(router);
app.use('/usermanager/v1', router)

let client_path;
if(config.environment=='development')
    client_path ='/public/usermanager_develop';
else
    client_path ='/public/usermanager';

app.use(express.static(__dirname+client_path));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'doc')));
app.use(express.static(path.join(__dirname, client_path)));
app.use('*', express.static(__dirname + client_path));


var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'base',layoutDir: __dirname + '/server/views/layouts', extname: '.hbs'}));

var viewsPath = path.join(__dirname +'/server/', '', 'views');
app.set('views', viewsPath);
app.set('view engine', '.hbs');

// Require our routes into the application.
//require('./server/routes')(app);

router.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the User Manager API.',
}));

module.exports = app;
