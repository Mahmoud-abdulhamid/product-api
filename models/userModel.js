const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
    name: { type: String , required: true},
    email: { type: String , required: true, unique: true},
    password: { type: String , required: true},
    role: {type: String , enum: ['user' , 'admin'] , default: 'user'},
} ,{timestamps: true});

userschema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password ,10);
    next();
});

userschema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword , this.password);
};

module.exports = mongoose.model('User' , userschema);