import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import axios from 'axios'
import Users from './components/Users';
import People from './components/People';
import UserForm from './components/UserForm';
import UserFormReadOnly from './components/UserFormReadOnly';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import User from './components/User';

export const UserContext = createContext()

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {isLoggedIn} = useSelector((state) => state.loggedUser);
  console.log(isLoggedIn)
  return (
    // <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        {isLoggedIn && <Navigation />}
        <Routes>
          {
            isLoggedIn ? (
              <>
                <Route path="/users" element={<Users />} />
                {/* <Route path="/userform" element={<UserForm />} /> */}
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
    // </UserContext.Provider>
  );
}

export default App;

// Password as it is - encrypt
// Delete operation - postman done - Fe 
// Update operation - both postman - Fe
// Authentication - login and signup - tokens
// Testing 
// Deployment
// Github
