import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods, deleteFood } from "../slices/foodSlice";

const Foods = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteFood(id));
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Foods</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map(food => (
          <div key={food._id} className="border p-2 rounded shadow">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-bold mt-2">{food.name}</h2>
            <p>${food.price}</p>
            <p>{food.category}</p>
            <div className="flex justify-between mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button
                onClick={() => handleDelete(food._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
