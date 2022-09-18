const express = require("express");
const bcrypt = require("bcryptjs")
const {UserModel/*הסכמה שמייצרת ובודקת במסד נתונים*/, validUser, validLogin, genToken } = require("../models/UsersModel");
const jwt = require("jsonwebtoken")
const{authToken}=require("../auth/authToken");
const router = express.Router();

router.get("/", (req, res) => {
  //הנתיב ביחס למה שהגדרתי בקונפיג רואט
  res.json({ message: "users work 3333" });
})

router.post("/registar", async (req, res) => {
  //req.body - מה שנשלח מהצד לקוח
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let userEmailCheack = await UserModel.findOne({email:req.body.email})
    if(userEmailCheack){
      return(res.status(400).json({message: "Email Already in System"}))
    }
    let user = new UserModel(req.body);
    user.pass = await bcrypt.hash(user.pass, 10);
    await user.save();
    user.pass = "*******";
    let newToken = genToken(user._id)//מייצר תוקן לפי מה שאני מכניס EMAIL/ID
    console.log(newToken)
    res.json({userinfo:user,token:newToken,expiresIn:3600});
  } 
  catch (err) {
    console.log(err);
    return res.status(400).json({message: "Email Already in System or there another problem" });
    }
});

router.post("/login",async(req,res) =>{
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  //נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
  let user = await UserModel.findOne({email:req.body.email})
  if(!user){
    return res.status(401).json({message:"user not found"});
  }
  //נבדוק אם הסיסמא שנשלחה מתאימה להצפנה במסד נתונים  
  let passValid= await bcrypt.compare(req.body.pass,user.pass)//user מה שנמצא במסד נתונים
  if(!passValid){
    return res.status(401).json({message:"Password wrong"});
  }
  //נחזיר הודעה שהכל בסדר ונייצר טוקן
  let newToken = genToken(user._id)//מייצר תוקן לפי מה שאני מכניס EMAIL/ID
  res.json({token:newToken,expiresIn:3600});
})

router.get("/userInfo",authToken, async(req,res)=>{
  console.log(req.tokenData)// authToken.js מגיע מה ,genToken(user.email/user._id)המידע שהתוקן שלנו ייצר מלמעלה
  let user = await UserModel.findOne({_id: req.tokenData.id},{pass:0}) 
  res.json(user);
  })

module.exports = router; // אפשר לעשות פעם אחת פר קובץ
