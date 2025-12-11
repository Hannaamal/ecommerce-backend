
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shipping: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalPrice: Number,
  paymentMethod: { type: String, default: "Cash on Delivery" },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
