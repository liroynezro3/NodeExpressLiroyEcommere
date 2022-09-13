const express=require("express");
const router = express.Router();
const { OrdersModel , validOrders} = require("../models/OrdersModel")

router.post("/", async (req, res) => {//http://127.0.0.1:3000/orders להעלות הזמנה
  let validBody = validOrders(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let orders = new OrdersModel(req.body);
    await orders.save();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
});

  router.get("/", async (req, res) => {//http://127.0.0.1:3000/orders - all orders
    let data = await OrdersModel.find({});
    res.json(data);
  });
  
  router.get("/phonenumber", async (req, res) => { 
    let PhoneQ = req.query.number; //http://127.0.0.1:3000/orders/phonenumber/?number=0502457449 - find order by phonenumber querystring
    let data = await OrdersModel.find({});
    let temp_ar = data.filter((item) => {
      return item.PhoneNumber == PhoneQ;
    });
    res.json(temp_ar);
  });
  router.get("/:OrderID", async (req, res) => { 
    let OrderIDQ= req.params.OrderID; //http://127.0.0.1:3000/orders/63034fe4c895c2cccfb86c44 - find order by ID
    let data = await OrdersModel.find({});
    let temp_ar = data.filter((item) => {
      return item.id == OrderIDQ;
    });
    res.json(temp_ar);
  })

  
  router.delete("/:idDel", async (req, res) => {//http://127.0.0.1:3000/orders/:idDel - delete Order by id
    try {
      let data = await OrdersModel.deleteOne({ _id: req.params.idDel });
      //אם יש הצלחה נקבל מאפיין של אן = 1
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
  /*router.put("/:idEdit", async (req, res) => {//http://127.0.0.1:3000/orderss/:idEdit + send-req.body
    let validBody = validorderss(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let data = await OrdersModel.updateOne({_id: req.params.idEdit},req.body);
      //אם יש הצלחה נקבל מאפיין של אן = 1
      res.json(data);
    } 
    catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });*/
  module.exports = router; // אפשר לעשות פעם אחת פר קובץ
