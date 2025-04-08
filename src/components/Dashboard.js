// src/components/Dashboard.js
import React from 'react';
// import './Dashboard.css'; // Import custom CSS for additional styling
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Dashboard Content</h1>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <h5 className="card-title">Total Sales</h5>
                            <p className="card-text">$10,000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <h5 className="card-title">Total Registered Users</h5>
                            <p className="card-text">1,200</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="card-text">300</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card text-white bg-danger">
                        <div className="card-body">
                            <h5 className="card-title">Total Views</h5>
                            <p className="card-text">5,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



