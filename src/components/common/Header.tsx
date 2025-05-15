import React from 'react';
import { auth } from "../../services/firebase";
import { useSelector } from "react-redux";
import '../../styles/common/Header.css'; 
import { RootState } from '../../store';
import { useRenderModeToggle } from "../../hooks/common/useRenderModeToggle";

const Header: React.FC = () => {
    const focusedRenderMode = useSelector((state: RootState) => state.ui.selectedRenderMode);
    const { toggleRenderMode } = useRenderModeToggle();

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
                <button
                    onClick={() => toggleRenderMode(focusedRenderMode as "wiki" | "chat")}
                    className="toggle-button"
                >
                    {focusedRenderMode === 'wiki' ? 'Chat' : 'Wiki'}
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;