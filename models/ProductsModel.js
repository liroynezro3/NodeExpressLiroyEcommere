const mongoose = require("mongoose");
const Joi = require("joi");
const ProductsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  description: String,
  price: Number,
  category: String,
  date_created: {
    type: Date,
    default: Date.now(),
  },
});
const ProductsModel = mongoose.model("products", ProductsSchema);
exports.ProductsModel = ProductsModel;

exports.validProducts = (_bodydata) => {
  let joiSchema = Joi.object({
    id: Joi.number().min(1).max(99999).required(),
    name: Joi.string().min(2).max(20).required(),
    img: Joi.string().min(5).max(300),
    description: Joi.string().min(2).max(200),
    price: Joi.number().min(1).max(9999).required(),
    category: Joi.string().min(1).max(50).required(),
  });
  return joiSchema.validate(_bodydata);
};
