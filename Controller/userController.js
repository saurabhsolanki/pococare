const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(name, email, password);
  try {
    const user=new User({name,email,password})
    await user.save()
    console.log("userrrr",user)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(401).json(error)
  }
};

exports.userLogin=async(req,res)=>{
    const {email,password}=req.body
    console.log("login reqbody",req.body)

    if(!email || !password){
        return res.status(422).json({error:"fill all the details"})
    }

    try {
        const userValid=await User.findOne({email})
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                return res.status(422).json({error:"invalid Details"})
            }
            else{
                // token generate
                const token = jwt.sign({ _id: userValid._id, email: userValid.email }, "SECRET1234", {
                    expiresIn: "1d",
                  });
                  const refreshtoken = jwt.sign(
                    { id: userValid._id, email: userValid.email},
                    "REFRESH1234",
                    {
                      expiresIn: "7 days",
                    }
                  );

                const result = {
                    userValid,
                    token,
                    refreshtoken
                }
               return res.status(201).json(result)
            }
        }
    } catch (error) {
        res.status(401).json(error);
    }

}


exports.verifyUser=async(req,res)=>{
  try {
      const ValidUserOne = await User.findOne({_id:req.userId});
      res.status(201).json({status:201,ValidUserOne});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
}

