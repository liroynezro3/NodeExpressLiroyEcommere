const mongoose = require("mongoose");
const Joi = require("joi");
const OrdersSchema = new mongoose.Schema({
  Name: String,
  City: String,
  PhoneNumber: String,
  PostalCode: String,
  Street: String,
  OrderTotalPrice: Number,
  orderedItem: Array,
  date_created: {
    type: Date,
    default: Date.now(),
  },
});
const OrdersModel = mongoose.model("orders", OrdersSchema);
exports.OrdersModel = OrdersModel;

exports.validOrders = (_bodydata) => {
  let joiSchema = Joi.object({
    City: Joi.string().min(3).max(99),
    Name: Joi.string().min(3).max(99).required(),
    OrderTotalPrice: Joi.number().min(0.1).max(200000).required(),
    PhoneNumber: Joi.string().min(3).max(15),
    PostalCode: Joi.string().min(3).max(10).required(),
    Street: Joi.string().min(3).max(99).required(),
    orderedItem: Joi.array()
  });
  return joiSchema.validate(_bodydata);
};

