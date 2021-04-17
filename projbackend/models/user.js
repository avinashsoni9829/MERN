const mongoose=require('mongoose');
const cyrpto=require('cyrpto');
const uuidv1=require('uuid/v1');

const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         maxlength:32,
         trim: true
    },
    lastName: {
        type: String,
        required: false,
        maxlength:32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userInfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default:0
    },
    purchases : {
        type: Array,
        default: []
    }

});


//virtuals


userSchema.virtual("password")
          .set(function(password){
            // _ for private vairable 
            this._password = password
            this.salt=uuidv1();
            this.encry_password = this.securePassword(password)
          })
          .get(function(){
              return this._password
          })


userSchema.method={

    authenticate: function(plainPassword)
    {
         return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword : function(plainPassword){
        if(!password)
        {
           return "";
        }

        try
        {
            return createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } 
        catch(err){
                  return "";
        } 
    }
}


module.exports=mongoose.model("User",userSchema);
