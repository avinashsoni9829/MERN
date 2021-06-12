var express = require("express");
var router = express.Router();
/*     
      https://express-validator.github.io/docs/  


*/    

const { check, validationResult } = require("express-validator");

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    // check contains the error to be displayed on voilations
    /* 
      
         https://express-validator.github.io/docs/check-api.html

    */
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);


module.exports = router;
