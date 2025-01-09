import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RefrshHandler from './RefrshHandler';
import HomePage from './pages/HomePage';
import DashMan from './pages/DashMan';
import DashPan from './pages/DashPan';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Conditionally hide the Navbar for specific routes
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  // PrivateRoute component for authenticated routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      {!hideNavbar && <Navbar />} {/* Render Navbar conditionally */}
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/DashMan" element={<DashMan />} />
        <Route path="/DashPan" element={<DashPan />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
