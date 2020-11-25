const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	user: String,
	token: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('accesstoken', UserSchema);