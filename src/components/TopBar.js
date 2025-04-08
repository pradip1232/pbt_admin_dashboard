// src/components/TopBar.js
import React from 'react';
import { Button } from '@mui/material';
import { FaBars } from 'react-icons/fa'; // Importing the toggle icon

const TopBar = ({ toggleSidebar }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
            <Button onClick={toggleSidebar} style={{ color: 'white' }}>
                <FaBars />
            </Button>
            <h1 style={{ marginLeft: '10px' }}>Admin Dashboard</h1>
        </div>
    );
};

export default TopBar;