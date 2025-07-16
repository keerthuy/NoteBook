import express from 'express'
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import middleware from '../middleware/middleware.js';

const router = express.Router()

router.post('/register',async (req,res) =>{
try{

 const { name ,email,password } = req.body;
 const user = await User.findOne({email})
 if(user){
    return res.status(401).json({success:false, message:"User already exist"})
 }

const hashPassword = await bcrypt.hash(password,10)

const newUser = new User({
    name,email,password: hashPassword
})

await newUser.save()

return res.status(200).json({success:true , message:"Account Created Successfully"})
    }catch(error){
        console.error(error); // Log the error for debugging
        return res.status(500).json({success:false , message:"Error Adding User", error: error.message})
    }
})




router.post('/login',async (req,res) =>{
    try{

 const { email,password } = req.body;
 const user = await User.findOne({email})
 if(!user){
    return res.status(401).json({success:false, message:"User Not exist"})
 }

const checkPassword = await bcrypt.compare(password, user.password)

if(!checkPassword){
    return res.status(401).json({success: false, message:"Invailid Password"})
}

const token = jwt.sign({id: user._id},"securetkeyofnoteapp123@#", {expiresIn :"5h"});

return res
 .status(200)
 .json({success: true, token, user:{name:user.name}, message: "Login Sucessfully"});

    }catch(error){
return res
.status(500)
.json({success:false , message:"Error in Login"})
    }
})


router.get("/verify",middleware,async (req,res) => {
    return res.status(200).json({success :true, user:req.user})
})

export default router