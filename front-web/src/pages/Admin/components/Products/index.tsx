import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <Link to="/admin/products" className="mr-5">
                Listar Produtos
            </Link>
            <Link to="/admin/products/create" className="mr-5">
                Criar Produtos
            </Link>
            <Link to="/admin/products/10" className="mr-5">
                Editar Produtos
            </Link>
            <Switch>
                <Route path="/admin/products" exact>
                    <h1>Lista de Produtos</h1>
                </Route>
                <Route path="/admin/products/create">
                    <h1>Criar Novo Produtos</h1>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1>Editar Produto</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default Products;