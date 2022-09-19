const express = require("express");
const { authToken } = require("../auth/authToken");
const { Dummy_Items_Arr } = require("../data/AllProductsData");
const router = express.Router();
const { ProductsModel, validProducts } = require("../models/ProductsModel");
router.get("/backup", (req, res) => {
  res.json(Dummy_Items_Arr);
});
router.get("/", async (req, res) => {//http://127.0.0.1:3000/products
  let data = await ProductsModel.find({});
  res.json(data);
});
router.get("/Category", async (req, res) => { 
  let CategoryQ = req.query.category; //http://127.0.0.1:3000/products/category/?category=computers
  let data = await ProductsModel.find({});

  let temp_ar = data.filter((item) => {
    return item.category == CategoryQ;
  });
  res.json(temp_ar);
});
router.get("/itemID", async (req, res) => { 
  let idQ = req.query.id; //http://127.0.0.1:3000/products/itemid/?id=102
  let data = await ProductsModel.find({});
  let temp_ar = data.filter((item) => {
    return item.id == idQ;
  });
  res.json(temp_ar);
});
router.post("/",authToken, async (req, res) => {//http://127.0.0.1:3000/products להעלות מוצר
  console.log(req.tokenData)//מגיע מה AUTHTOKEN
  let validBody = validProducts(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  let products = await ProductsModel.findOne({id:req.body.id})
  if(products){
    return res.status(401).json({message:"this id used already please try other ID"});
  }
  try {
    let product = new ProductsModel(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
});

router.delete("/:idDel", async (req, res) => {//http://127.0.0.1:3000/products/:idDel
  try {
    let data = await ProductsModel.deleteOne({ _id: req.params.idDel });
    //אם יש הצלחה נקבל מאפיין של אן = 1
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
router.put("/:idEdit", async (req, res) => {//http://127.0.0.1:3000/products/:idEdit + req.body
  let validBody = validProducts(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let data = await ProductsModel.updateOne({_id: req.params.idEdit},req.body);
    //אם יש הצלחה נקבל מאפיין של אן = 1
    res.json(data);
  } 
  catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
module.exports = router; // אפשר לעשות פעם אחת פר קובץ
