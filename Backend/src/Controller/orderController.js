import Order from "../Model/Order.js";

// Get all orders for a user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
