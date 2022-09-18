const mongoose = require("mongoose");
const shoppingCarSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    status: ["PENDING", "PAID"],
    listProducts: [{
        productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
        price: { type: Number },
        quantity: { type: Number, required: [true, "quantity is required"], },
        total: { type: Number }
    }],

});

const Shoppingcart = mongoose.model("Shoppingcar", shoppingCarSchema);
module.exports = Shoppingcart;