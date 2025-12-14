import Order from "../model/orders.js";

export const getMyOrders = async (req, res) => {
  try {
    // use req.userData from your auth middleware
    const userId = req.userData.userId;

    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized: User not found",
      });
    }

    const orders = await Order.find({ userId }); // no sort

    console.log("ORDERS:", orders);

    return res.status(200).json({
      status: true,
      orders,
    });
  } catch (error) {
    console.error("ERROR FETCHING ORDERS:", error);
    if (!res.headersSent) {
      return res.status(500).json({
        status: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  }
};
