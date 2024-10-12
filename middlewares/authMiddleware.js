const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


// make sure is registred and login user
exports.protect = async (req, res , next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];}
        console.log(token);
        
        if(!token){
            return res.status(401).json({error: 'Not authorized'});
        }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);            
            req.user = await User.findById(decoded.id);
            
            next();
        }catch(err){
            return res.status(401).json({error: 'Not authorized'});
        }
};

// make sure admin

exports.admin = (req, res , next)=>{
    console.log(req.user.role);
    
    if(req.user.role !=='admin'){
        console.log("not Admin");
        return res.status(401).json({error: 'Access denied'});
    }
    next();
};