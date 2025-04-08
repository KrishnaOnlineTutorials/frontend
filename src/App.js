import React, { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Users from './components/Users';
import UserForm from './components/UserForm';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import './App.css';

export const UserContext = createContext()

function App() {
  const { isLoggedIn, role } = useSelector((state) => state.loggedUser) || true;
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      if (role !== 'admin') {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login
        if (userId) {
          navigate(`/users/${userId}`);
        }
      }
    }
  }, [isLoggedIn, role, navigate]);
  return (
    <div className="App">
      {isLoggedIn && <Navigation />}
      <Routes>
        {
          isLoggedIn ? (
            <> {role === 'admin' ? (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserProfile />} />
              </>
            ) : (
              // Regular user: Show single user details
              <Route path="/users/:id" element={<UserProfile />} />
            )}
              <Route path="*" element={<Navigate to="/users"></Navigate>} />
            </>
          )
            : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<UserForm />} />
                <Route path="*" element={<Navigate to="/login"></Navigate>} />
              </>
            )
        }

      </Routes>
    </div>
  );
}

export default App;
