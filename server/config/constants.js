const config = require('../config/config');
module.exports = {
    'languages': {
        'english': 'en',    
    },
    'response_codes': {
        'created': 201,
        'success': 200,
        'unauthorized': 401,
        'error': 403,
        'not_found': 404,
        'internal_server_error': 500,
    },
    'date_format': 'YYYY-MM-DD HH:mm:ss',
    'body_parser_param_limit': 100000000,
    'image_upload_path': './public/uploads/',
    'report_upload_path':process.cwd() + '/public/uploads/',
    'image_path':config.base_url+'/uploads/',
};
