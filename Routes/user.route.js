const express=require("express")
const router= new express.Router()
const userController=require("../Controller/userController")
const jwt = require("jsonwebtoken");
const {isAuth}=require('../middleware/authentication')


router.post("/signup",userController.userSignup)
router.post("/login",userController.userLogin)

// this is for refreshing the token
router.post("/verify", async (req, res) => {
    const refreshtoken = req.headers.authorization;
    try {
      const data = jwt.verify(refreshtoken, "REFRESH1234");
      const maintoken = jwt.sign(data, "SECRET1234", {
        expiresIn: "5 second",
      });
      return res.send({ token: maintoken });
    } catch (error) {
      return res.send("refresh token invalid");
    }
  });


  router.get("/validuser",isAuth,userController.verifyUser);

module.exports=router