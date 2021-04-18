const moongoose=require('moongoose');

const {ObjectId} =moongoose.Schema;



const ProductCartSchema= new mongoose.Schema({

     product: {
         type: ObjectId,
         ref:"Product",

     },

     name: String,

     count: Number,

     price :Number
})






const OrderSchema= new moongoose.Schema({

    products : [ProductCartSchema],
    transaction_id: {},
    amount : {type:Number},
    address : String,
    updated: Date,
    user: {
        type:  ObjectId,
        ref : "User"
    }
},{timestamps:true});

const ProductCart= moongoose.model("ProductCart",ProductCartSchema);

const Order= mongoose.model("Order",OrderSchema);

module.exports = {Order,ProductCart};
