import Food from "../Model/Food.js";

const MAIN_BACKEND_URL = "http://localhost:5001";

export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFood = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const imageUrl = req.file
      ? `${MAIN_BACKEND_URL}/uploads/${req.file.filename}`
      : null;

    const newFood = new Food({
      name,
      price,
      description,
      category,
      image: imageUrl
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFood = async (req, res) => {
  try {
    const updatedFields = req.body;

    if (req.file) {
      updatedFields.image = `${MAIN_BACKEND_URL}/uploads/${req.file.filename}`;
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedFood) return res.status(404).json({ message: "Food not found" });
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
