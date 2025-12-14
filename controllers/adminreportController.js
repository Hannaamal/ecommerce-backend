import Order from "../model/orders.js";

export const getRevenueOverTime = async (req, res, next) => {
  try {
    const revenueData = await Order.aggregate([
      { $match: { /* filter if needed, e.g., status: "completed" */ } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // sort by date ascending
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: "Revenue over time fetched",
      data: revenueData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch revenue data",
      error: err.message,
    });
    next(err);
  }
};
