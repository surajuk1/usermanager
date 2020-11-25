const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	salt: String,
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('user', UserSchema);