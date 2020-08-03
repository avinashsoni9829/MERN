var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
const crypto= require('crypto');
const uudiv1=require('uuid/v1');
var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname:{
    type:String,
    required:false,
    maxlength:32,
    trim:true   

  },

     email:{
      type:String,
      trim:true,
      required:true,
      unique:true
  },
   
  userinfo: 
  {
      type:String,
      trim:true
  },
  // todo: come back here!
    encry_password: {
      type:String,
      required: true
    },
    salt: String,
    role: {
        type:Number,
        default:0
    },

    purchases:{
        type:Array,
        default:[]
    }

 
     
});

userSchema.virtual("password")
         .set(function(password){
             // _ is used to declare as a private variable
            this._password=password;
            this.salt==uudiv1();
            this.encry_password=this.securePassword(password);
         })
         .get(function(){
             return this._password;
         })

userSchema.method={
    securePassword: function (plainpassword)
    {
        if(!password) return "";
        try {
            crypto.createHmac('sha256', this.salt)
                   .update(plainpassword )
                   .digest('hex');

            
        } catch (error) {
            return "";
            
        }
    }
}

module.exports = mongoose.model("User",userSchema)
