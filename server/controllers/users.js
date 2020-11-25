
// const AccessToken = require('../models').access_tokens;
// const RefreshToken = require('../models').refresh_tokens;
const bcrypt = require('bcrypt');
const Joi = require('joi');
const constants = require('./../config/constants');
const config = require('./../config/config');
const responses = require('./../helpers/responses');
var UserAccess = require('./../middleware/access');
const dbmongoose = require('../mongomodels');
var jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../mongomodels/user.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const self = module.exports = {


  async login(req,res){

    try {
      const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required().strict(),
      });

      const ret = Joi.validate(req.body, userSchema, {
        // return an error if body has an unrecognised property
        allowUnknown: false,
        // return all errors a payload contains, not just the first one Joi finds
        abortEarly: false
      });

      if (ret.error) {
        return res.status(constants.response_codes.error).json(responses.errorMsg(ret.error.details[0].context.label.toString(), ret.error.details[0].message.toString()));
      }

      const email = req.body.email;
      const password = req.body.password;

      const userdet = await User.findOne({
        email: email
      });

      if(!userdet) {
        return res.status(constants.response_codes.error).json(responses.errorMsg('username_password_not_match', lang.error.username_password_not_match));
      }

      const hash = await bcrypt.hashSync(password, userdet.salt);

      const userdetail = await User.findOne({
          email: email, 
          password: hash
      }).then(async (user) => {

        if(user) {
          //User generateToken
          var userdata= {
            email:user.email,
            name:user.name,
          }

          var device={}

          const usertoken = await UserAccess.generateToken(userdata,device, function(err, data_det,next) {

            return res.json({
              status:true,
              success: "login_user_success",
              message: "Login successfully",
              data: data_det,
            });

          });

        } else {
          return res.status(constants.response_codes.error).json(responses.errorMsg('username_password_not_match', lang.error.username_password_not_match));
        }

      })
      .catch(err => {
        console.log(err);return res.status(constants.response_codes.error).json(responses.errorMsg('failed_user_login', lang.validation.failed_user_login));
      });
    } catch (error) {
      console.error(error);
    }
  },

  async register(req,res){
    try {
      const userSchema = Joi.object({
        name: Joi.string().min(2).max(60).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(10).required(),
      });

      const ret = Joi.validate(req.body, userSchema, {
        // return an error if body has an unrecognised property
        allowUnknown: false,
        // return all errors a payload contains, not just the first one Joi finds
        abortEarly: false
      });

      if (ret.error) {
        return res.status(constants.response_codes.error).json(responses.errorMsg(ret.error.details[0].context.label.toString(), ret.error.details[0].message.toString()));
      }

      const name = req.body.name.trim()
      const email = req.body.email.trim()
      const password = req.body.password.trim()

      var userdet = await User.findOne({
          email: email,
      });


      if(userdet) {
        return res.status(constants.response_codes.error).json(responses.errorMsg('already_exist', 'Email already exist, Please user another email'));
      }


      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);


      //Start mongooses db 
      const newUser = {
        name:name,
        email:email,
        salt:salt,
        password:hash,
      };

      // Create
      const userDB = new User(newUser);
      userDB.save();
      //End mongooses db

      if(userDB.isNew) {
        return res.json({
          status:true,
          success: "register_user_success",
          message: "Registered successfully",
        });
      } else {
        return res.json({
          status:false,
          success: "register_user_failed",
          message: "Registered Failed",
        });       
      }

    } catch (error) {
      console.error(error);
    }
  },

  async users_detail(req,res){

      console.log(req.email);
      let email = req.email;

      var resultObj = {}

      if(email){
        resultObj = await User.findOne({
          email: email
        })
      }


      if(resultObj) {
        return res.json({
          status:true,
          data: {name:resultObj.name,email:resultObj.email},
        });
      }

  },


  async getall_user_detail(req,res){

      var resultObj = await User.find()


      const resObj = resultObj.map(data => {
        return Object.assign(
          {},
          {
            id: data._id,
            name: data.name,
            email: data.email,
        })
      });

      if(resultObj) {
        return res.json({
          status:true,
          data: resObj,
        });
      }

  },

}

    
  