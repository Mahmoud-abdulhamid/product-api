const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantaty: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String , default: 'Pending'}
} ,{timestamps: true});

module.exports = mongoose.model('Order' , orderSchema);
