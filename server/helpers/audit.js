const config = require('./../config/config');
const constants = require('./../config/constants');
const AuditLog = require('../models').auditrail;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

function log(req, res, next) {

    const newLog = {
      method:req.method,
      mode: req.mode,
      remote_address: req._remoteAddress,
      json_header: req.headers,
      json_body: req.body,
      json_params: req.params,
      json_query: req.query,
    };

    AuditLog.create(newLog).then(function(data){})

    next();
}

module.exports = {
    log: log
};
