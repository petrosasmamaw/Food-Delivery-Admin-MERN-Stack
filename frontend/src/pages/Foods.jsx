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

  if (status === "loading") return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Foods</h1>
        <a href="/foods/create" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow">Create Food</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(food => (
          <div key={food._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.01] transform transition">
            <div className="h-44 w-full overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{food.name}</h2>
                  <div className="text-sm text-gray-500">{food.category}</div>
                </div>
                <div className="text-indigo-600 font-bold">${food.price}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <a href={`/foods/edit/${food._id}`} className="flex-1 text-center bg-white border border-indigo-600 text-indigo-600 px-3 py-2 rounded-lg">Edit</a>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="flex-1 text-center bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
