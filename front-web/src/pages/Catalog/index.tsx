import React, {useEffect} from 'react';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom'
import './styles.scss'
import { makeRequest } from '../../core/utils/request';

const Catalog  = () => {

    useEffect(() => {

        const params = {
            page: 0,
            linesPerPage: 12
        }

        makeRequest({ url: '/products', params})

            .then(response => console.log(response));
    }, []);

    return (
        <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de produtos
            </h1>
            <div className="catalog-products">
            <Link to="/products/1"><ProductCard/></Link>
            <Link to="/products/2"><ProductCard/></Link>
            <Link to="/products/3"><ProductCard/></Link>
            <Link to="/products/4"><ProductCard/></Link>
            <Link to="/products/5"><ProductCard/></Link>
            <Link to="/products/6"><ProductCard/></Link>
            <Link to="/products/7"><ProductCard/></Link>
            <Link to="/products/8"><ProductCard/></Link>
            <Link to="/products/9"><ProductCard/></Link>
            </div>
        </div>
    );
}

export default Catalog;