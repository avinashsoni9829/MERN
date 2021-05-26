const Product=require("../models/product");
const formidable= require("formidable");
const _ =require("lodash");
// file system
const fs=require("fs");



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
