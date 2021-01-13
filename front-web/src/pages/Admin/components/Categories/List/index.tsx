import ProductFilters from 'core/components/ProductFilters';
import React from 'react';
import Card from '../Card';
import './styles.scss'

const List = () => {
    return (
        <div className="admin-products-list">
            <div className="d-flex">
                <button className="btn btn-primary btn-lg" onClick={console.log}>
                    ADICIONAR
                </button>
                <span className="admin-product-filter ml-5 justify-center">
                    <ProductFilters onSearch={filter => console.log} />
                </span>
            </div>

            <div className="admin-list-container">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default List;