var mongoose = require('mongoose');
var def_date= new Date();
var userSchema = mongoose.Schema({
		auth: {
			id: String,
		token: String,
		email: String,
		name: String
	},
	college:{type:String, default:'None'},
	phone_number:{type:Number, default:000},
	present_level:{type:Number, default:0 },
	unlocked:{type:Number, default:0},
	user_access:{type:Number, default:0},
	timestamp: {type:Date, default: def_date},
	photo: String

});


module.exports = mongoose.model('User', userSchema);
