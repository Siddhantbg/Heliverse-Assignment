import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("patients");

  const [patients, setPatients] = useState([]);
  const [patientForm, setPatientForm] = useState({
    id: null,
    name: "",
    age: "",
    condition: "",
  });

  const [mealTasks, setMealTasks] = useState([]);
  const [mealForm, setMealForm] = useState({
    id: null,
    staff: "",
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
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedMeals = JSON.parse(localStorage.getItem("mealTasks")) || [];
    setPatients(storedPatients);
    setMealTasks(storedMeals);
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("mealTasks", JSON.stringify(mealTasks));
  }, [mealTasks]);

  const handlePatientFormSubmit = (e) => {
    e.preventDefault();
    if (patientForm.id) {
      setPatients((prev) =>
        prev.map((patient) =>
          patient.id === patientForm.id ? { ...patientForm } : patient
        )
      );
    } else {
      setPatients([
        ...patients,
        { ...patientForm, id: Date.now().toString() },
      ]);
    }
    setPatientForm({ id: null, name: "", age: "", condition: "" });
  };

  const handleDeletePatient = (id) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
  };

  const handleMealFormSubmit = (e) => {
    e.preventDefault();
    if (mealForm.id) {
      setMealTasks((prev) =>
        prev.map((task) => (task.id === mealForm.id ? { ...mealForm } : task))
      );
    } else {
      setMealTasks([...mealTasks, { ...mealForm, id: Date.now().toString() }]);
    }
    setMealForm({
      id: null,
      staff: "",
      mealType: "Morning",
      preparationStatus: "Not Started",
      deliveryStatus: "Not Delivered",
    });
  };

  const handleDeleteMealTask = (id) => {
    setMealTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "patients" ? "bg-gray-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("patients")}
          >
            Patient Management
          </li>
          <li
            className={`cursor-pointer p-2 rounded mt-2 ${
              activeTab === "meals" ? "bg-gray-600" : "hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("meals")}
          >
            Meal Preparation
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "patients" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Patient Management</h3>
            <form onSubmit={handlePatientFormSubmit} className="mb-6">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={patientForm.name}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, name: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={patientForm.age}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, age: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Condition"
                  value={patientForm.condition}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, condition: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {patientForm.id ? "Update Patient" : "Add Patient"}
                </button>
              </div>
            </form>
            <ul>
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  className="flex justify-between items-center p-4 mb-2 bg-white shadow rounded"
                >
                  <div>
                    <p>Name: {patient.name}</p>
                    <p>Age: {patient.age}</p>
                    <p>Condition: {patient.condition}</p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      onClick={() => setPatientForm(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "meals" && (
          <div>
              <br />
            <form onSubmit={handleMealFormSubmit} className="mb-6">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Staff"
                  value={mealForm.staff}
                  onChange={(e) =>
                    setMealForm({ ...mealForm, staff: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <select
                  value={mealForm.mealType}
                  onChange={(e) =>
                    setMealForm({ ...mealForm, mealType: e.target.value })
                  }
                  className="p-2 border rounded"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
                <select
                  value={mealForm.preparationStatus}
                  onChange={(e) =>
                    setMealForm({
                      ...mealForm,
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
                  value={mealForm.deliveryStatus}
                  onChange={(e) =>
                    setMealForm({ ...mealForm, deliveryStatus: e.target.value })
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
                  {mealForm.id ? "Update Task" : "Add Task"}
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
                    <p>Staff: {task.staff}</p>
                    <p>Meal: {task.mealType}</p>
                    <p>Preparation: {task.preparationStatus}</p>
                    <p>Delivery: {task.deliveryStatus}</p>
                  </div>
                  <div>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      onClick={() => setMealForm(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteMealTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
