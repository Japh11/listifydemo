// src/pages/Home.js
import React from 'react';
import './Home.css';
import logo from '../assets/logo.png'; // Ensure the logo path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Home({ setIsLoggedIn }) {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleGetStarted = () => {
        // Navigate to the tasks page (you can change this to any other page)
        navigate('/tasks');
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Clear login state
        setIsLoggedIn(false); // Update login state
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="home">
            <header className="home-header">
                <div className="welcome-container">
                    <h1>Welcome to Our Task Manager</h1>
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <p className="tagline">Organize your tasks</p>
            </header>

            <section className="home-intro">
                <div className="feature">
                    <h2>📅 Calendar</h2>
                    <p>View and manage your tasks on an interactive calendar.</p>
                </div>
                <div className="feature">
                    <h2>📝 Tasks</h2>
                    <p>Keep track of tasks, mark them as done, and prioritize your workload.</p>
                </div>
                <div className="feature">
                    <h2>⚙️ Settings</h2>
                    <p>Customize your app experience and preferences to suit your needs.</p>
                </div>
            </section>

            <section className="cta-section">
                <button className="cta-button" onClick={handleGetStarted}>
                    Get Started
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </section>

            <footer className="home-footer">
                <p>&copy; 2024 Task Manager App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
