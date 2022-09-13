const jwt = require("jsonwebtoken");
exports.authToken = (req, res, next) => {
  //לבדוק אם בכלל נשלח טוקן
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "you must send token111" });
  }
  //לבדוק אם הטוקן תקני או בתוקף
  try {
  let decodeToken = jwt.verify(token, "LiroySECRET");
   req.tokenData = decodeToken;
    //אם הכל בסדר נעבור לפונקציה הבאה 
   next();
  } 
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "token invalid or expred 4444" });
  }
};