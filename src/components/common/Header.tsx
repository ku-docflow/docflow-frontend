import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import '../../styles/common/Header.css'; 

const Header: React.FC = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <header className="header">
            <div className="left-group">
                <img src="/DocFlow.png" alt="DocFlow Icon" className="logo" />
                <h1 className="title">DocFlow</h1>
            </div>
            <div className="right-group">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;