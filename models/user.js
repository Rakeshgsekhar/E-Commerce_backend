const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1")

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        requried:true,
        maxlength:32,
        trim: true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim: true
    },
    email:{
        type:String,
        trim: true,
        required: true,
        unique: true
    },

    userinfo:{
        type:String,
        trim:true
    },
    usr_passcod:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type: Number,
        default:0
    },
    
    purchases:{
        type:Array,
        default: []
    }

},{timestamps: true});

userSchema.virtual("password")
    .set(function (password){
        this._password = password
        this.salt = uuidv1()
        this.usr_passcod = this.securePassword(password)
    })
    .get(function(){return this._password})

userSchema.methods = {
    securePassword: function(password){
        if(!password) return "";

        try{
            return crypto.createHmac('sha256',this.salt)                    //Creating a Secure Password.
            .update(password)
            .digest('hex')
        }catch(err)
        {
            return err;
        }
    },
    authenticate :  function(password){
        return this.securePassword(password) === this.usr_passcod
    }
}


module.exports = mongoose.model("ADMUSRMST",userSchema)