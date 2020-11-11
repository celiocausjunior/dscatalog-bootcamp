import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
    <Navbar/>
    <div className="admin-content">
        <Switch>
            <Route path="/admin/products">
                <h1>products</h1>
            </Route>

            <Route path="/admin/categories">
                <h1>categories</h1>
            </Route>

            <Route path="/admin/users">
                <h1>users</h1>
            </Route>
        </Switch>
      </div>
    </div>
    );

export default Admin;