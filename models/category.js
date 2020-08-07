const moongoose=require("moongoose");

const categorySchema= new moongoose.Schema({
    name:{
        type: String,
        trim: true,
        requried:true,
        maxlength: 32,
        unique:true
    }
},
{timestamps: true});

module.exports=moongoose.model("Category",categorySchema);
