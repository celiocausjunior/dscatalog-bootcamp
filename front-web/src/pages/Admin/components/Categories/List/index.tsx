import Pagination from 'core/components/Pagination';
import ProductFilters, {  } from 'core/components/ProductFilters';
import {  CategoryResponse } from 'core/types/Categories';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss'

const List = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoryResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/categories/create')
    }
    
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
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
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

            {categoriesResponse && <Pagination
                totalPages = {categoriesResponse?.totalPages}
                activePage = {activePage}
                onChange = {page => setActivePage(page)}
            />}
        </div>
    )
}

export default List;