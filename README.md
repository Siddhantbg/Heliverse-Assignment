Hospital Food Management System

This repository contains the Hospital Food Management System, a web application designed to streamline the management of meals and patient-related activities in hospitals. The project is part of an assignment for Heliverse. It demonstrates software development skills to build and manage a robust, scalable system while adhering to best practices in programming.

Features

1. Patient Management

Add, update, and delete patient details.

Assign and manage meal plans for patients.

2. Meal Management

Plan and schedule meals (breakfast, lunch, dinner).

Monitor preparation and delivery times for efficiency.

3. Dashboard

Intuitive sidebar navigation with options for patient and meal management.

Real-time updates using React components.

4. Responsive Design

Fully responsive interface optimized for desktops and mobile devices.

Technologies Used

Frontend

React.js: For building the user interface.

Tailwind CSS: For styling and responsive design.

Backend (Optional for Future Integration)

Node.js and Express.js: To handle server-side logic and API routes.

Data Storage

localStorage: For temporary storage of patient and meal data.

Deployment

Vercel: For seamless hosting and deployment of the application.

Installation & Setup

Follow these steps to set up the application locally:

Prerequisites

Node.js (v16+)

npm or yarn

Steps

Clone the Repository

git clone https://github.com/your-username/hospital-food-management.git
cd hospital-food-management

Install Dependencies

npm install

Run the Application

npm start

Open the application at http://localhost:3000.

Usage

Managing Patients

Navigate to the Patient Management section.

Add new patient details such as name, meal preferences, and contact information.

Update or delete patient records as needed.

Managing Meals

Navigate to the Meal Management section.

Plan meals and assign them to patients.

Update meal timings and monitor preparation schedules.

Folder Structure

.
├── public             # Static files (e.g., favicon, index.html)
├── src
│   ├── components     # Reusable React components
│   │   ├── PatientManagement.jsx
│   │   ├── MealPreparation.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx        # Root component
│   ├── index.js       # Application entry point
│   └── styles.css     # Global styles
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation

Deployment

The application is deployed on Vercel. Access it at:
https://heliverse-assignment.vercel.app

Future Enhancements

Integration with a backend server to store data persistently.

Adding authentication for secure access to patient and meal records.

Notifications for meal preparation and delivery updates.

Contact

For any questions or suggestions, feel free to reach out:

Name: [Your Name]

Email: [Your Email]

GitHub: https://github.com/your-username

Acknowledgments

This project is part of the internship assignment process at Heliverse. Special thanks to the team at Heliverse for providing this opportunity.

