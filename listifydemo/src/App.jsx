import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.png';

// Import pages and components
import Login from './pages/loginpage';
import UserRegister from './pages/Registeruser';
import AdminRegister from './pages/Registeradmin';
import CalendarPage from './pages/Calendar';
import Tasks from './pages/Tasks';
import Home from './pages/Home'; // Import the Home component

function Settings() {
    return <div><h2>Settings Page</h2></div>;
}

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [page, setPage] = useState('login');

    // Check local storage on mount
    useEffect(() => {
        const loggedInUser = localStorage.getItem('isLoggedIn');
        if (loggedInUser === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    // Function to handle login
    const handleLogin = async (type, credentials) => {
        try {
            const url = type === 'users'
                ? 'http://localhost:8080/api/auth/login/user'
                : 'http://localhost:8080/api/auth/login/admin';
            const response = await axios.post(url, credentials);
            alert(`Logged in as ${type === 'users' ? 'User' : 'Admin'}`);
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true'); // Store login state
            return true; // Indicate successful login
        } catch (error) {
            alert('Invalid credentials or user not registered.');
            console.error('Error logging in:', error);
            return false; // Indicate failed login
        }
    };

    // Function to handle user registration
    const registerUser = async (type, credentials) => {
        try {
            const url = type === 'users'
                ? 'http://localhost:8080/api/auth/register/user'
                : 'http://localhost:8080/api/auth/register/admin';
            await axios.post(url, credentials);
            alert(`${type === 'users' ? 'User' : 'Admin'} registered successfully!`);
            setPage('login');
        } catch (error) {
            alert('Registration failed. Please try again.');
            console.error('Error registering:', error);
        }
    };

    return (
        <Router>
            <div style={styles.appContainer}>
                {!isLoggedIn ? (
                    page === 'login' ? (
                        <Login setPage={setPage} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
                    ) : page === 'userRegister' ? (
                        <UserRegister setPage={setPage} registerUser={registerUser} />
                    ) : (
                        <AdminRegister setPage={setPage} registerUser={registerUser} />
                    )
                ) : (
                    <div className="container">
                        <div className="sidebar">
                            <div className="logo-container">
                                <img src={logo} alt="logo" className="logo" />
                            </div>
                            <ul>
                                <li>
                                    <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                        CALENDAR
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                        TASKS
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/settings" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                        SETTINGS
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn to Home */}
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>

                        </div>
                    </div>
                )}
            </div>
        </Router>
    );
};

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f9',
        fontFamily: 'Arial, sans-serif',
    },
};

export default App;
