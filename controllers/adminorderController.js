// controllers/orderReportController.js
import orders from "../model/orders.js";


export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await orders.countDocuments(); // total orders count

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
