const redisClient = require("../config/redis");
const User  = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
var jwt  = require("jsonwebtoken");
const Submission = require("../models/submission");

const  register = async(req,res)=>{
    try{ 
        validate(req.body);
        const{firstName,emailID,password} = req.body;   //validate the data 
       req.body.password = await  bcrypt.hash(password,10);
       req.body.role = 'user';
       const user =   await User.create(req.body);
      const token  =  jwt.sign({_id:user._id,emailID:emailID,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
      res.cookie('token',token,{maxAge:60*60*1000});
      const reply = {
          firstName: user.firstName,
          emailID: user.emailID,
          _id: user._id,
          role:user.role
      };
      res.status(201).json({
            user:reply,
            message:"Registered Successfully!"
        })

    }
    catch(err){
        res.status(400).send("Error:"+err);
    }

}
const login = async(req,res)=>{
    try{
        const {emailID,password} = req.body;
        if(!emailID)
             throw new Error("Credentials are Invalid!");
        if(!password)
             throw new Error("credentials are Invalid!");
        const user  = await User.findOne({emailID});
        if(!user) throw new Error("Invalid Credentials!");
        const match  =  await bcrypt.compare(password,user.password);

        if(!match)
            throw new Error("Invalid Credentials!");
        const reply = {
            firstName:user.firstName,
            emailID:user.emailID,
            _id :user._id
        }
        const token  =  jwt.sign({_id:user._id,emailID:emailID,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).json({
            user:reply,
            message:"Login Successfully!"
        })

    }
    catch(err){
        res.status(401).send("Error: "+ (err.message || err));
    }
}
const logout = async(req, res) => {
    try {
        const {token} = req.cookies;
        
        if(!token) {
            throw new Error("No token found!");
        }
        
        // Add token to Redis blocklist with 1 hour expiration
        await redisClient.setEx(`token:${token}`, 3600, 'blocked');
    
        // Clear the cookie
        res.clearCookie('token');
        
        res.status(200).send("Logged out successfully!");
    }
    catch(err) {
        res.status(400).send("Error: " + err.message);
    }
}
const adminRegister = async(req,res)=>{
    try{ 
        validate(req.body);
        const{firstName,emailID,password} = req.body;   //validate the data 
       req.body.password = await  bcrypt.hash(password,10);
       const user =   await User.create(req.body);
      const token  =  jwt.sign({_id:user._id,emailID:emailID,role:user.role},process.env.JWT_KEY,{expiresIn:60*60});
      res.cookie('token',token,{maxAge:60*60*1000});
      res.status(201).send("User Registered Suceessfully!");

    }
    catch(err){
        res.status(400).send("Error:"+err);
    }
    
}
const deleteProfile = async(req,res)=>{
    try{
     const userId = req.result._id;
    await  User.findByIdAndDelete(userId);
//    await  Submission.deleteMany({userId});
   res.status(200).send("Delete SuccessFully!");


  
    }
    catch(err){
        res.status(500).send("Internal Server Error!");


    }

}
module.exports = {register,login,logout,adminRegister,deleteProfile};
