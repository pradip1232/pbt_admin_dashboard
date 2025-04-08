// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import Products from './Products';
import Update from './Update';
import Blogs from './Blogs';

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false); // Close sidebar on mobile
        } else {
            setIsOpen(true); // Open sidebar on larger screens
        }
    };

    useEffect(() => {
        // Set initial state based on window size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                <div style={{ flex: 1 }}>
                    <TopBar toggleSidebar={toggleSidebar} />
                    <div style={{ padding: '20px' }}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/update" element={<Update />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default Layout;