const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
name:String,
email:String,
pass:String,
role:{
    type:String,default:"regular"
},
date_created:{
    type:Date,default:Date.now()
}
})
exports.UserModel= mongoose.model("users",userSchema);

exports.genToken = (userEnteredInfo)=>{ //_userid האימייל שהכנסתי
let token = jwt.sign({id:userEnteredInfo},"LiroySECRET",{expiresIn:"60mins"}); //id:מה לשמור בתוקן
return token;
}

exports.validUser = function(_bodyData){
    let joiSchema = Joi.object({
      name:Joi.string().min(3).max(99).required(),
      email:Joi.string().min(2).max(300).required().email(),
      pass:Joi.string().min(6).max(100).required(),
    });
    return joiSchema.validate(_bodyData)
  }

  exports.validLogin= function(_bodyData){
    let joiSchema = Joi.object({   
      email:Joi.string().min(2).max(300).required().email(),
      pass:Joi.string().min(6).max(100).required(),
    });
    return joiSchema.validate(_bodyData)
  }