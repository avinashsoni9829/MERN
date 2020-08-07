const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    
    name: String,
    count: Number,
    price: Number,

    // can mention size,copupn,delievery,company name
});

const ProductCart = mongoose.model("ProductCart",ProductCartSchema)



const OrderSchema= new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:{type:String},
    updated:{type:Date}, 
    user:{type:ObjectId,       /// whenever we use the object id we need to mention the ref parameter as well   
          ref:"User"
        }

    // can add isCashonDelievery for cash on delivery options
},{timestamps:true});


const Order=mongoose.model("Order",OrderSchema)

module.exports={Order,ProductCart}
