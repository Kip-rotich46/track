import React, { useState } from 'react';
import { FaPlus, FaAppleAlt, FaCarrot, FaHamburger, FaUtensils } from 'react-icons/fa';

const FoodAndDiets = ({ userId }) => {
  const [meals, setMeals] = useState([
    {
      id: 1,
      type: 'breakfast',
      items: [
        { name: 'Oatmeal', calories: 150, protein: 6, carbs: 27, fat: 3 },
        { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0 },
      ],
    },
    {
      id: 2,
      type: 'lunch',
      items: [
        { name: 'Chicken Salad', calories: 350, protein: 25, carbs: 10, fat: 12 },
        { name: 'Whole Grain Bread', calories: 120, protein: 4, carbs: 23, fat: 2 },
      ],
    },
    {
      id: 3,
      type: 'dinner',
      items: [
        { name: 'Grilled Salmon', calories: 400, protein: 46, carbs: 0, fat: 22 },
        { name: 'Steamed Vegetables', calories: 100, protein: 4, carbs: 15, fat: 1 },
      ],
    },
  ]);

  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '', type: 'lunch' });

  const getMealIcon = (type) => {
    switch (type) {
      case 'breakfast':
        return <FaAppleAlt className="text-red-500" />;
      case 'lunch':
        return <FaUtensils className="text-green-500" />;
      case 'dinner':
        return <FaHamburger className="text-orange-500" />;
      default:
        return <FaCarrot className="text-yellow-500" />;
    }
  };

  const calculateTotalNutrition = () => {
    return meals.reduce((acc, meal) => {
      const mealTotals = meal.items.reduce((mealAcc, item) => ({
        calories: mealAcc.calories + item.calories,
        protein: mealAcc.protein + item.protein,
        carbs: mealAcc.carbs + item.carbs,
        fat: mealAcc.fat + item.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fat: acc.fat + mealTotals.fat,
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    // Convert string values to numbers
    const mealData = {
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      fat: parseInt(newMeal.fat),
      name: newMeal.name
    };

    // Add new meal to selected meal type
    const targetMeal = meals.find(meal => meal.type === newMeal.type);
    if (targetMeal) {
      const updatedMeals = meals.map(meal => {
        if (meal.type === newMeal.type) {
          return {
            ...meal,
            items: [...meal.items, mealData]
          };
        }
        return meal;
      });
      setMeals(updatedMeals);
    }

    // Reset form and close modal
    setShowAddMeal(false);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '', type: 'lunch' });
  };

  const totals = calculateTotalNutrition();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Food & Diet Tracker</h2>
        <button
          onClick={() => setShowAddMeal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
        >
          <FaPlus /> Add Meal
        </button>
      </div>

      {/* Nutrition Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Calories</div>
          <div className="text-xl font-semibold">{totals.calories}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Protein</div>
          <div className="text-xl font-semibold">{totals.protein}g</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Carbs</div>
          <div className="text-xl font-semibold">{totals.carbs}g</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Fat</div>
          <div className="text-xl font-semibold">{totals.fat}g</div>
        </div>
      </div>

      {/* Meals List */}
      <div className="space-y-6">
        {meals.map((meal) => (
          <div key={meal.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              {getMealIcon(meal.type)}
              <h3 className="text-lg font-semibold capitalize">{meal.type}</h3>
            </div>
            <div className="space-y-2">
              {meal.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>{item.name}</span>
                  <div className="text-sm text-gray-600">
                    <span className="mr-4">{item.calories} cal</span>
                    <span className="mr-4">{item.protein}g protein</span>
                    <span className="mr-4">{item.carbs}g carbs</span>
                    <span>{item.fat}g fat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add New Meal</h3>
            <form onSubmit={handleAddMeal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Name</label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meal Type</label>
                <select
                  value={newMeal.type}
                  onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calories</label>
                  <input
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                  <input
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                  <input
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                  <input
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddMeal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Add Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodAndDiets;
