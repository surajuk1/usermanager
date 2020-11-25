const moment = require('moment');
const express = require('express');
const config = require('../config/config');
var UserAccess = require('./../middleware/access');
const constants = require('./../config/constants');
const userController = require('../controllers').users;

const responses = require('./../helpers/responses');
const upload = require('./../helpers/image_upload');
var cron = require('node-cron');
var jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


function authenticateUser(req, res, next, isAuth, cb) {

    var bearerToken = req.headers.authorization;

    if (!bearerToken) {
        if (isAuth)
            return cb('invalid_token');
        else
            return next();
    }

    var token = bearerToken.split(' ')[1];

    console.log(token);

    if (!token) return cb('invalid_token');


    
    jwt.verify(token, config.login_secrets, function(err, decoded) {
        if (!decoded) return cb('invalid_token');
        
          //recheck istoken available
          UserAccess.istokenexpired(bearerToken, function(err, data) {
            
            if (err || !data) return cb('invalid_token');
                req.email = data.user;
                cb(null,req);
          });

    });
}

function isAuthenticated(req, res, next) {

    authenticateUser(req, res, next, true, function(err, data) {
        if (err) return res.status(constants.response_codes.unauthorized).json(responses.errorMsg(err, lang.error[err]));

        else
            next();
    });
}

function auditLog(req, res, next) {
    audit.log(req, res, next);
}


module.exports = (router) => {
 
  const version = '';	

  //Users POST /v1/users/signup/mobile
  router.post(version+'/users/register',userController.register);
  router.post(version+'/users/session',userController.login);
  router.get(version+'/users/session',isAuthenticated,userController.users_detail);
  router.get(version+'/users/all',isAuthenticated,userController.getall_user_detail);


  router.use(version, (req, res) => res.status(200).send({
    message: 'Welcome to the EzyRent API!!!!!!!!!!!!!!!!!!!',
  }));
};