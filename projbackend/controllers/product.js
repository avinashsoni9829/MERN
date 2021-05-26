const Product=require("../models/product");
const formidable= require("formidable");
const _ =require("lodash");
// file system
const fs=require("fs");
const { exists } = require("../models/product");



exports.getProductById =  (req,res,next,id) =>{
Product.findById(id)
       .populate("category")
       .exec((err,product) =>
       { 
         if(err || !product){
         return res.status(400).json({
             error : "Product not found"
         })
       }
     req.product=product;
     next();
 
       });
       
    };



exports.createProduct = (req,res) =>
{
    // we will use form data 
            
          
          let form = new formidable.IncomingForm();

          form.keepExtensions = true;

          form.parse(req,(err,fields,file) =>{
            
                 if(err){
                  return   res.status(400).json({
                         error : "problem with image"
                     });
                 }

                 // destructure

                 const {name,description,price,category,stock}=fields;
                 
                 if(!name || !description || !price || !category || !stock)
                {
                       res.status(400).json({
                           error : "Please Include all the fields"
                       });

                 }


                 // restrictions on fields here 
               



                 let product = new Product(fields);

                 //handling the files

                 if(file.photo){
                    // checking if file size if >3MB 
                    if(file.photo.size>3000000){
                       return  res.status(404).json({
                             error  : "File Size is too big!"
                         })
                     };


                     product.photo.data = fs.readFileSync(file.photo.path);

                     product.photo.contentType= file.photo.type;
                  }

                  // saving to DB

                  product.save((err,product) =>{
                      if(err || !product){
                          return  res.status(400).json({
                              error : "Saving tshirt to DB failed"
                          })
                      }

                      res.json(product);

                  })

             
                })
            };


exports.getProduct= (req, res) =>{

     req.product.photo=undefined;
     
     return res.json(req.product);
}


// makes our application fast
exports.photo = (req, res,next) =>{
    if(req.product.photo.data){
        
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
     }

     next();
}


exports.deleteProduct=(req, res) =>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
       if(err){
            return res.status(400).json({
                error : "Failed to delete product"
            })

         }
         res.json("SuccessFully Deleted!")
     })


}


exports.updateProduct=(req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req,(err,fields,file) =>{
           if(err)
           { 
            return   res.status(400).json({
               error : "problem with image"
                });
            }
            //updation
           let product =req.product;
          // lodash help in updating
           product = _.extend(product,fields);
           //file handling
           if(file.photo){
               // checking if file size if >3MB 
               if(file.photo.size>3000000){
                  return  res.status(404).json({
                        error  : "File Size is too big!"
                    })
                };


                product.photo.data = fs.readFileSync(file.photo.path);

                product.photo.contentType= file.photo.type;
             }

             // saving to DB

             product.save((err,product) =>{
                 if(err || !product){
                     return  res.status(400).json({
                         error : "Failed To Update Product"
                     })
                 }

                 res.json(product);

             })

        
           })


    
}


exports.getAllProducts = (req, res) => {
// negative sign is applied in the -photo as we dont want that to be shown 
  
    let limit=req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? (req.query.sortBy) : "_id" 

    product.find()
           .select("-photo")
           .populate("category")
           .sort([[sortBy,"asc"]])
           .limit(limit)
           .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"no product found"
            })
        }

        res.json(products);

    })

}



exports.getAllUniqueCategories= (req, res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
           res.status(400).json({
            error:"no category found"
           })
        }

        res.json(category);

    })
}



exports.updateStock =(req,res,next) =>{
 
     let myOperations = req.body.order.products.map(prod =>{
         return {
             updateOne : {
                 filter: {_id : prod._id},
                 update : {$inc : {stock: -prod.count,sold : +prod.count}}
             }
         }
     })
     
    Product.bulkWrite(myOperations,{},(err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Bulk operation failed"
            })
        }

      

        next();
    })
     
   
}


