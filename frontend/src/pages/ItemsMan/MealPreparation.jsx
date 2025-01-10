import React, { useState, useEffect } from "react";

function MealPreparation() {
  const [mealPlans, setMealPlans] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    morningMeal: "",
    morningInstructions: "",
    eveningMeal: "",
    eveningInstructions: "",
    nightMeal: "",
    nightInstructions: "",
    morningDelivered: false,
    eveningDelivered: false,
    nightDelivered: false,
  });

  // Load meal plans and form data from localStorage
  useEffect(() => {
    const storedMealPlans = JSON.parse(localStorage.getItem("mealPlans")) || [];
    const storedForm = JSON.parse(localStorage.getItem("mealForm")) || {
      patientName: "",
      morningMeal: "",
      morningInstructions: "",
      eveningMeal: "",
      eveningInstructions: "",
      nightMeal: "",
      nightInstructions: "",
      morningDelivered: false,
      eveningDelivered: false,
      nightDelivered: false,
    };

    setMealPlans(storedMealPlans);
    setForm(storedForm);
  }, []);

  // Save meal plans and form data to localStorage
  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
  }, [mealPlans]);

  useEffect(() => {
    localStorage.setItem("mealForm", JSON.stringify(form));
  }, [form]);

  const handleSave = (e) => {
    e.preventDefault();
    if (form.id) {
      setMealPlans((prev) =>
        prev.map((meal) => (meal.id === form.id ? { ...form } : meal))
      );
    } else {
      setMealPlans([...mealPlans, { ...form, id: Date.now() }]);
    }
    setForm({
      patientName: "",
      morningMeal: "",
      morningInstructions: "",
      eveningMeal: "",
      eveningInstructions: "",
      nightMeal: "",
      nightInstructions: "",
      morningDelivered: false,
      eveningDelivered: false,
      nightDelivered: false,
    });
    localStorage.removeItem("mealForm");
  };

  const handleDelete = (id) => {
    setMealPlans((prev) => prev.filter((meal) => meal.id !== id));
  };

  const handleEdit = (meal) => {
    setForm(meal);
  };

  const toggleDelivery = (id, mealType) => {
    setMealPlans((prev) =>
      prev.map((meal) =>
        meal.id === id
          ? { ...meal, [`${mealType}Delivered`]: !meal[`${mealType}Delivered`] }
          : meal
      )
    );
  };

  const calculateAnalytics = () => {
    const totalDelivered = mealPlans.reduce(
      (acc, meal) => {
        if (meal.morningDelivered) acc.morning++;
        if (meal.eveningDelivered) acc.evening++;
        if (meal.nightDelivered) acc.night++;
        return acc;
      },
      { morning: 0, evening: 0, night: 0 }
    );

    return totalDelivered;
  };

  const { morning, evening, night } = calculateAnalytics();

  return (
    <div>
        <h1 className="text-2xl font-semibold mb-6">Meal Preparation</h1>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium mb-4">
          {form.id ? "Edit Meal Plan" : "Add New Meal Plan"}
        </h3>
        <input
          type="text"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="mb-4">
          <h4 className="font-medium">Morning Meal</h4>
          <input
            type="text"
            placeholder="Meal"
            value={form.morningMeal}
            onChange={(e) => setForm({ ...form, morningMeal: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Instructions (e.g., no salt)"
            value={form.morningInstructions}
            onChange={(e) =>
              setForm({ ...form, morningInstructions: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <h4 className="font-medium">Evening Meal</h4>
          <input
            type="text"
            placeholder="Meal"
            value={form.eveningMeal}
            onChange={(e) => setForm({ ...form, eveningMeal: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Instructions (e.g., low sugar)"
            value={form.eveningInstructions}
            onChange={(e) =>
              setForm({ ...form, eveningInstructions: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <h4 className="font-medium">Night Meal</h4>
          <input
            type="text"
            placeholder="Meal"
            value={form.nightMeal}
            onChange={(e) => setForm({ ...form, nightMeal: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Instructions (e.g., no oil)"
            value={form.nightInstructions}
            onChange={(e) =>
              setForm({ ...form, nightInstructions: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {form.id ? "Update Meal Plan" : "Add Meal Plan"}
        </button>
      </form>

      {/* Meal Plans List */}
      <ul>
        {mealPlans.map((meal) => (
          <li
            key={meal.id}
            className="p-4 mb-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p>Patient: {meal.patientName}</p>
              <p>
                Morning: {meal.morningMeal} ({meal.morningInstructions}) -{" "}
                <button
                  className={`${
                    meal.morningDelivered ? "text-green-500" : "text-red-500"
                  }`}
                  onClick={() => toggleDelivery(meal.id, "morning")}
                >
                  {meal.morningDelivered ? "Delivered" : "Not Delivered"}
                </button>
              </p>
              <p>
                Evening: {meal.eveningMeal} ({meal.eveningInstructions}) -{" "}
                <button
                  className={`${
                    meal.eveningDelivered ? "text-green-500" : "text-red-500"
                  }`}
                  onClick={() => toggleDelivery(meal.id, "evening")}
                >
                  {meal.eveningDelivered ? "Delivered" : "Not Delivered"}
                </button>
              </p>
              <p>
                Night: {meal.nightMeal} ({meal.nightInstructions}) -{" "}
                <button
                  className={`${
                    meal.nightDelivered ? "text-green-500" : "text-red-500"
                  }`}
                  onClick={() => toggleDelivery(meal.id, "night")}
                >
                  {meal.nightDelivered ? "Delivered" : "Not Delivered"}
                </button>
              </p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                onClick={() => handleEdit(meal)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(meal.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Analytics Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-2">Analytics</h3>
        <p>Morning Meals Delivered: {morning}</p>
        <p>Evening Meals Delivered: {evening}</p>
        <p>Night Meals Delivered: {night}</p>
      </div>
    </div>
  );
}

export default MealPreparation;
