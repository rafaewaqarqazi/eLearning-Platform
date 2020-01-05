const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type: String,
        required:true
    },
    salt: String,
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:Date,
    profileImage:{
        filename:String
    },
    role:{
        type:String,
        default: 'Student'
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordLink: String,
    emailVerificationCode:{
        type:String
    },
    courses:[{type:ObjectId, ref:"Courses"}]
});


userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        //generate a timestamp
        this.salt = uuidv1();

        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this.password;
    });


//methods

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password)
            return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (err) {
            return "";
        }
    }
};
module.exports = mongoose.model('Users',  userSchema);