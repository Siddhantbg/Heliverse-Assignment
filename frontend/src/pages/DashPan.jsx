import React, { useState, useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";

function PantryDashboard() {
  const [pantryStaff, setPantryStaff] = useState([]);
  const [mealTasks, setMealTasks] = useState([]);
  const [pantryForm, setPantryForm] = useState({
    id: null,
    name: "",
    contact: "",
    location: "",
  });
  const [taskForm, setTaskForm] = useState({
    id: null,
    staffId: "",
    mealType: "Morning",
    preparationStatus: "Not Started",
    deliveryStatus: "Not Delivered",
  });

  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { state: { message: "Please log in to access this page." } });
    } else {
      const isValid = true; 
      if (!isValid) {
        localStorage.removeItem("token");
        navigate("/login", { state: { message: "Session expired. Please log in again." } });
      }
    }
  }, [navigate]);

  useEffect(() => {
    const storedStaff = JSON.parse(localStorage.getItem("pantryStaff")) || [];
    const storedTasks = JSON.parse(localStorage.getItem("mealTasks")) || [];
    setPantryStaff(storedStaff);
    setMealTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("pantryStaff", JSON.stringify(pantryStaff));
  }, [pantryStaff]);

  useEffect(() => {
    localStorage.setItem("mealTasks", JSON.stringify(mealTasks));
  }, [mealTasks]);

  // Handle pantry staff form submission
  const handlePantryFormSubmit = (e) => {
    e.preventDefault();
    if (pantryForm.id) {
      setPantryStaff((prev) =>
        prev.map((staff) =>
          staff.id === pantryForm.id ? { ...pantryForm } : staff
        )
      );
    } else {
      setPantryStaff([
        ...pantryStaff,
        { ...pantryForm, id: Date.now().toString() },
      ]);
    }
    setPantryForm({ id: null, name: "", contact: "", location: "" });
  };

  // Handle meal task form submission
  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    if (taskForm.id) {
      setMealTasks((prev) =>
        prev.map((task) =>
          task.id === taskForm.id ? { ...taskForm } : task
        )
      );
    } else {
      setMealTasks([
        ...mealTasks,
        { ...taskForm, id: Date.now().toString() },
      ]);
    }
    setTaskForm({
      id: null,
      staffId: "",
      mealType: "Morning",
      preparationStatus: "Not Started",
      deliveryStatus: "Not Delivered",
    });
  };

  const handleDeleteStaff = (id) => {
    setPantryStaff((prev) => prev.filter((staff) => staff.id !== id));
  };

  const handleDeleteTask = (id) => {
    setMealTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Pantry Dashboard</h1>
{/* Pantry Staff Management */}
<div className="mb-6">
  <h3 className="text-xl font-semibold mb-4">Manage Pantry Staff</h3>
  <form onSubmit={handlePantryFormSubmit} className="mb-6">
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Staff Name"
        value={pantryForm.name}
        onChange={(e) =>
          setPantryForm({ ...pantryForm, name: e.target.value })
        }
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={pantryForm.contact}
        onChange={(e) =>
          setPantryForm({ ...pantryForm, contact: e.target.value })
        }
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={pantryForm.location}
        onChange={(e) =>
          setPantryForm({ ...pantryForm, location: e.target.value })
        }
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {pantryForm.id ? "Update Staff" : "Add Staff"}
      </button>
    </div>
  </form>
  <ul>
    {pantryStaff.map((staff) => (
      <li
        key={staff.id}
        className="flex justify-between items-center p-4 mb-2 bg-white shadow rounded"
      >
        <div>
          <p>Name: {staff.name}</p>
          <p>Contact: {staff.contact}</p>
          <p>Location: {staff.location}</p>
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
            onClick={() => setPantryForm(staff)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleDeleteStaff(staff.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

{/* Meal Task Management */}
<div>
      <br />
  <form onSubmit={handleTaskFormSubmit} className="mb-6">
    <div className="flex flex-col gap-4">
      <select
        value={taskForm.staffId}
        onChange={(e) =>
          setTaskForm({ ...taskForm, staffId: e.target.value })
        }
        className="p-2 border rounded"
      >
        <option value="">Select Staff</option>
        {pantryStaff.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.name}
          </option>
        ))}
      </select>
      <select
        value={taskForm.mealType}
        onChange={(e) =>
          setTaskForm({ ...taskForm, mealType: e.target.value })
        }
        className="p-2 border rounded"
      >
        <option value="Morning">Morning</option>
        <option value="Evening">Evening</option>
        <option value="Night">Night</option>
      </select>
      <select
        value={taskForm.preparationStatus}
        onChange={(e) =>
          setTaskForm({
            ...taskForm,
            preparationStatus: e.target.value,
          })
        }
        className="p-2 border rounded"
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={taskForm.deliveryStatus}
        onChange={(e) =>
          setTaskForm({
            ...taskForm,
            deliveryStatus: e.target.value,
          })
        }
        className="p-2 border rounded"
      >
        <option value="Not Delivered">Not Delivered</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {taskForm.id ? "Update Task" : "Add Task"}
      </button>
    </div>
  </form>
  <ul>
    {mealTasks.map((task) => (
      <li
        key={task.id}
        className="flex justify-between items-center p-4 mb-2 bg-white shadow rounded"
      >
        <div>
          <p>
            Staff:{" "}
            {pantryStaff.find((staff) => staff.id === task.staffId)?.name ||
              "N/A"}
          </p>
          <p>Meal: {task.mealType}</p>
          <p>Preparation: {task.preparationStatus}</p>
          <p>Delivery: {task.deliveryStatus}</p>
        </div>
        <div>
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
            onClick={() => setTaskForm(task)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}

export default PantryDashboard;

