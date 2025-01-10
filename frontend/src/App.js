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

  const hideNavbar = location.pathname === '/DashMan' || location.pathname === '/DashPan'|| location.pathname === '/home';

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      {/* Conditionally render Navbar */}
      {!hideNavbar && <Navbar />} 

      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/DashMan" element={<PrivateRoute element={<DashMan />} />} />
        <Route path="/DashPan" element={<PrivateRoute element={<DashPan />} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
