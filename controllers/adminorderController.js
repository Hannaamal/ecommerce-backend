// controllers/orderReportController.js
import Order from "../model/orders.js";
import User from "../model/user.js";


export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments(); // total orders count

    res.status(200).json({
      status: true,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch total orders",
      error: error.message,
    });
  }
};


// GET all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email role") // include user info
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};




export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();


    res.status(200).json({
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

