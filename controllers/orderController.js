import Order from "../model/orders.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { shipping, cartItems, totalPrice } = req.body;

    const order = new Order({
      shipping,
      items: cartItems,
      totalPrice,
      paymentMethod: "COD",
      status: "Pending",
    });

    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch orders" });
  }
};
