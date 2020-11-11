import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './core/components/Navbar';
import ProductDetails from './pages/Catalog/components/ProductDetails';


const Routes = () => (
    <BrowserRouter>
        <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/products" exact>
                    <Catalog />
                </Route>
                <Route path="/products/:productId">
                    <ProductDetails />
                </Route>
                <Route path="/admin">
                    <Redirect to="/admin/products"/>
                    <Admin />
                </Route>
            </Switch>
    </BrowserRouter>
);

export default Routes;
