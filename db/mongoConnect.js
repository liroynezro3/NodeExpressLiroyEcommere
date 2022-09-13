const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://liroynezro3:Liroy123@cluster0.hkdyg.mongodb.net/shop');
  console.log("Mongo Connecteddd")
}
