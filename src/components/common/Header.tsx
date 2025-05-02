import React from 'react';
import { auth } from "../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import '../../styles/common/Header.css'; 
import { RootState } from '../../store';
import { resetSelection, setSelectedRenderMode } from "../../store/slices/uiSlice";


const Header: React.FC = () => {
    const dispatch = useDispatch();
    const focusedRenderMode = useSelector((state: RootState) => state.ui.selectedRenderMode);

    const handleLogout = () => {
        auth.signOut();
    };

    const toggleRenderMode = (CurrentRendertype: string) => {
        CurrentRendertype === 'wiki' ? dispatch(setSelectedRenderMode('chat')) : dispatch(setSelectedRenderMode('wiki'));
        dispatch(resetSelection());
    };

    return (
        <header className="header">
            <div className="left-group">
                <img src="/DocFlow.png" alt="DocFlow Icon" className="logo" />
                <h1 className="title">DocFlow</h1>
            </div>
            <div className="right-group">
                <button
                    onClick={() => toggleRenderMode(focusedRenderMode)}
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