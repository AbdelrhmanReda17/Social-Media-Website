import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import Main from "./pages/main";
import  Navbar  from './components/navbar';
import Login from './pages/login';
import Register from './pages/register';
import { useAuthContext } from './hooks/userAuthContext';


function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
            <Routes >
            <Route path="/" element={user ? <Main /> : <Navigate to='/login' /> } />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />  } />
            <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
          </Routes>
        </div>

      </Router>
    </div>
  );
}

export default App;
