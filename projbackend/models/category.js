const moongoose=require('mongoose');

const categorySchema =new moongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true  
    },

   

},
{timestamps:true});

module.exports=mongoose.model("Category",categorySchema);
