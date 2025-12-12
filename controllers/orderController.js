import Order from "../model/orders.js";
import Cart from "../model/cart.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const userId = req.userData.userId; // Comes from auth middleware
    const { items, address, paymentMethod, totalAmount } = req.body;
    console.log("USER DATA:", req.userData);   // Check if user is authenticated
    console.log("REQ BODY:", req.body);  

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    const newOrder = await Order.create({
      userId,
      items,
      address,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
      orderStatus: "Pending",
    });
     await Cart.deleteMany({ user: req.userData.userId });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order creation failed", error: err.message });
  }
};
