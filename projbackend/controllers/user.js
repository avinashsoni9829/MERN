const User = require("../models/user");

// using params
exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
          if(err || !user) {

            return res.status(400).json({
                error:"NO USER IN DB"
            })

          }
          // user is found 

          req.profile = user

          next();

          
    })
}



exports.getUser = (req,res) =>{
    //TODO: get back here for pas 
    
    return res.json(req.profile)


}