//כל רואט נמצא בקובץ שלו וההגדרות נמצאות כאן

const indexR = require("./index"); //קורה לפונקציה של הרואט מindex
const usersR = require("./users"); //קורה לפונקציה של הרואט מindex
const productsR = require("./products");
const ordersR = require("./orders");
exports.routsInit = (app) => {
  app.use("/", indexR); //במקום לכתוב בפונקציה אנונימית
  app.use("/users", usersR);
  app.use("/products", productsR);
  app.use("/orders", ordersR);
  /*app.get("/users",(req,res) =>{
        //אומר לו להחזיר מידע בפורמט ג'ייסון לצד לקוח
        res.json({msg:"users work"});
    })*/
};
