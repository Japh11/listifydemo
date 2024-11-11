import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // Update the path to your logo image

const Navigation = () => {
    return (
        <div className="header">
            {/* Right side - Profile and Notification */}
            <div className="header-right">
                <NavLink to="/notifications" className="notification-btn" aria-label="Notifications">
                    🔔 {/* Notification bell emoji */}
                </NavLink>

                {/* Redirect profile link to Home page */}
                <NavLink to="/" className="user-profile" aria-label="User Profile">
                    <img src={logo} alt="User Logo" className="logo" />
                    <span className="user-name">John Doe</span> {/* Added class for styling */}
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;
