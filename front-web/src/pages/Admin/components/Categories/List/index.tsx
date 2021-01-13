import ProductFilters, { FilterForm } from 'core/components/ProductFilters';
import { Category, CategoryResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss'

const List = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoryResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory;

    console.log(categoriesResponse);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }
        setIsLoading(true);
        makeRequest({ url: '/categories', params })
            .then(response => setCategoriesResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

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
                {categoriesResponse?.content.map(category => (
                    <Card category={category} key={category.id} />
                ))}

            </div>
        </div>
    )
}

export default List;