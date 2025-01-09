import React, { useState, useEffect } from "react";

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contact: "",
    emergencyContact: "",
  });

  // Load patients and form data from localStorage when the component mounts
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedForm = JSON.parse(localStorage.getItem("patientForm")) || {
      name: "",
      diseases: "",
      allergies: "",
      roomNumber: "",
      bedNumber: "",
      floorNumber: "",
      age: "",
      gender: "",
      contact: "",
      emergencyContact: "",
    };
    setPatients(storedPatients);
    setForm(storedForm);
  }, []);

  // Save patients to localStorage whenever the `patients` state changes
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // Save form data to localStorage whenever the `form` state changes
  useEffect(() => {
    localStorage.setItem("patientForm", JSON.stringify(form));
  }, [form]);

  const handleSave = (e) => {
    e.preventDefault();
    if (form.id) {
      setPatients((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form } : p))
      );
    } else {
      setPatients([...patients, { ...form, id: Date.now() }]);
    }
    setForm({
      name: "",
      diseases: "",
      allergies: "",
      roomNumber: "",
      bedNumber: "",
      floorNumber: "",
      age: "",
      gender: "",
      contact: "",
      emergencyContact: "",
    });
    localStorage.removeItem("patientForm"); // Clear saved form from localStorage
  };

  const handleDelete = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (patient) => {
    setForm(patient);
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium mb-4">
          {form.id ? "Edit Patient" : "Add New Patient"}
        </h3>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Diseases"
          value={form.diseases}
          onChange={(e) => setForm({ ...form, diseases: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Allergies"
          value={form.allergies}
          onChange={(e) => setForm({ ...form, allergies: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Room Number"
          value={form.roomNumber}
          onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Bed Number"
          value={form.bedNumber}
          onChange={(e) => setForm({ ...form, bedNumber: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Floor Number"
          value={form.floorNumber}
          onChange={(e) => setForm({ ...form, floorNumber: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Emergency Contact"
          value={form.emergencyContact}
          onChange={(e) =>
            setForm({ ...form, emergencyContact: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {form.id ? "Update Patient" : "Add Patient"}
        </button>
      </form>
      <ul>
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="p-4 mb-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p>Name: {patient.name}</p>
              <p>Diseases: {patient.diseases}</p>
              <p>Room Number: {patient.roomNumber}</p>
              <p>Bed Number: {patient.bedNumber}</p>
              {/* Display more details */}
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                onClick={() => handleEdit(patient)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(patient.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientManagement;
