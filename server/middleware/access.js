var bcrypt = require('bcrypt');
var constants = require('./../config/constants');
var config = require('./../config/config');
//var knex = require('knex')(config.dbConnection);
var knex = '';
const AccessToken = require('../mongomodels/accesstoken.js');
const User = require('../mongomodels/user.js');
var moment = require('moment');
var request = require('request');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var now = moment().format(constants.date_format);
var responses = require('./../helpers/responses');
const md5 = require('md5');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


function generateToken(user,device, next) {
    
    var token = jwt.sign({ email: user.email, name: user.name }, config.login_secrets, { expiresIn: config.token_expires_in });
    
    var data = {access_token:token};

    if (user) {
        saveAccessToken(user,device, function(err, data ,access_token) {
            if (err) return next(err);
            data = {
                access_token: token,
                user: user
            };

            return next(null, data);

        });

    } else{
        return next(null, data);
    }
        
}


//Redis Adding Function
function saveAccessToken(user,data, next) {

    const newAccessToken = {
      user:user.email,
      token: data.access_token,
    };

    AccessToken.create(newAccessToken).then(function(data){
        console.log(data);
        next(null, data.access_token);
    })
    .catch(err => {
        console.log(err.toString());
        return next(err.toString());
    });
}

function istokenexpired(bearertoken,next) {

    var token = bearertoken.replace("Bearer","").trim();

    AccessToken.findOne({token: token}, function(err,obj) {
     next(null, obj); 
    });

}


function verify(input, key, method, type, signature) {
  if(type === "hmac") {
    return (signature === sign(input, key, method, type));
  }

  else {
    throw new Error('Algorithm type not recognized');
  }
}


module.exports = {
    generateToken: generateToken,
    saveAccessToken:saveAccessToken,
    istokenexpired:istokenexpired,
};
