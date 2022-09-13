const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "express work go to your Routes" });
});
module.exports = router; // אפשר לעשות פעם אחת פר קובץ
