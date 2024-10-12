const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate token method
const generateToken = (user) => {
  return jwt.sign({ id:user._id, role:user.role}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
// register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({token});
  } catch (err) {
    res.status(400).json({ message: err.message || 'Error while create user' });
  }
};
// login
exports.login = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:'Invalid email or password'});
        }
        const token=generateToken(user);
        res.status(200).json({token});
    }catch(err){
        res.status(400).json({message:err.message || 'Error while login user'});
    }
}