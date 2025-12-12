import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Ref to your user schema
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Multiple items from Cart
    items: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: false },
        productName: { type: String, required: true }, // store name at order time
        image: { type: String },
        price: { type: Number, required: true },       // store price at order time
        quantity: { type: Number, required: true },    // store cart qty
      },
    ],

    // Shipping Address
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      house: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    paymentId: { type: String }, // optional if online payment used

    // Price total
    totalAmount: {
      type: Number,
      required: true,
    },

    // Order status for admin panel
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
