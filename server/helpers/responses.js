const request = require('request');
const config = require('./../config/config');
const constants = require('./../config/constants');

function successMsg(tag, message, data) {
    return {
        success: tag,
        success_message: message,
        data: data
    };
}

function errorMsg(tag, message, error_msg, data) {

    if (error_msg) errorLog.error(error_msg);

    return {
        error: tag,
        error_message: message,
        data: data
    };
}

function buildErrorLog(req, error_msg) {

    if (typeof error_msg == 'undefined' || !error_msg) return null;

    return {
        url: req.originalUrl,
        message: error_msg
    };
}

function sendExternalUrlRequest(req, next) {

    let version = '/v1';
    let prev_version = '/ezyrent/v1';
    let headers = {};
    if (typeof req.user.id != 'undefined') headers.uId = req.user.id;
    if(typeof req.headers.authorization!='undefined') headers.authorization = req.headers.authorization;
    //if (typeof req.api_hash_key != 'undefined') headers.Authorization = req.api_hash_key;

    let options = {
        url: config.project_url + version + req.url.replace(prev_version,''),
        method: req.method,
        headers: headers
    };
    
    if (req.method == 'GET')
        options.qs = req.query;
    else
        options.form = req.body;

    request(options, function(error, response, body) {
        if (error || [constants.response_codes.success, constants.response_codes.internal_server_error, constants.response_codes.error, constants.response_codes.unauthorized].indexOf(response.statusCode) < 0) return next(true);
        return next(null, { statuscode: response.statusCode, data: response.body });
    });
}
async function acceptUserInvite(activation_link,activation_code) {
    let version = '/v1/';
    //let prev_version = '/hoist/v1';
    let headers = {};
    let response;
    

   // try {
            
            let options = {
                url: config.project_url + version + activation_link +'/'+activation_code,
                method: 'GET',
                headers: headers 
            };

            response = await request(options);
            return response;
            
   // }catch(err){ 
        //console.log(err);
        //return false; 

   ////}
}
async function activityRequest(activity_url,activity_headers,activity_params)
{
     //let version = '/v1/';
    //let prev_version = '/hoist/v1';
    //let headers = {};
    let response;
          
            let options = {
                url: activity_url,
                method: 'POST',
                headers: activity_headers,
                form:activity_params
            };

            response = await request(options);
            //console.log(response);
            return response;
}
function apiRequest(req, res) {
    sendExternalUrlRequest(req, function(err, data) {

        if (err) return res.status(constants.response_codes.error).json(errorMsg('url_not_found', lang.error.url_not_found, buildErrorLog(req, err)));
        res.status(data.statuscode).send(responseData(data.data));
    });
}

function apiRequestCB(req, next) {
    sendExternalUrlRequest(req, function(err, data) {
        if (err) return next(true);
        let returnData = responseData(data.data);
        returnData = (typeof returnData.data != 'undefined' ? returnData.data : data);
        next(null, { statuscode: data.statuscode, data: returnData });
    });
}

function responseData(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}

module.exports = {
    successMsg: successMsg,
    errorMsg: errorMsg,
    apiRequest: apiRequest,
    apiRequestCB: apiRequestCB,
    sendExternalUrlRequest: sendExternalUrlRequest,
    responseData: responseData,
    buildErrorLog: buildErrorLog,
    acceptUserInvite:acceptUserInvite,
    activityRequest:activityRequest
};
