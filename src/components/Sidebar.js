// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import { Home, ShoppingCart, Update } from '@mui/icons-material'; // Ensure this import is correct
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for toggle

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div style={{ width: isOpen ? '250px' : '0', height: '100vh', backgroundColor: '#f8f9fa', overflow: 'hidden', transition: 'width 0.3s' }}>
            
            {isOpen && (
                <>
                    <img src="https://via.placeholder.com/150" alt="Company Logo" style={{ width: '100%', height: '100px' }} />
                    <List>
                        <ListItem button component={Link} to="/">
                            <Home style={{ marginRight: '10px' }} />
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/products">
                            <ShoppingCart style={{ marginRight: '10px' }} />
                            <ListItemText primary="Products" />
                        </ListItem>
                        <ListItem button component={Link} to="/blogs">
                            <ShoppingCart style={{ marginRight: '10px' }} />
                            <ListItemText primary="Blogs" />
                        </ListItem>
                        <ListItem button component={Link} to="/update">
                            <Update style={{ marginRight: '10px' }} />
                            <ListItemText primary="Update" />
                        </ListItem>
                    </List>
                </>
            )}
        </div>
    );
};

export default Sidebar;