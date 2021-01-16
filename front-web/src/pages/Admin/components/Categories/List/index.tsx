import Pagination from 'core/components/Pagination';
import ProductFilters, { } from 'core/components/ProductFilters';
import { CategoryResponse } from 'core/types/Categories';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../../../../../core/components/Loaders/CardLoader'
import './styles.scss'

const List = () => {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoryResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getCategories = useCallback(() => {
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


    const handleCreate = () => {
        history.push('/admin/categories/create')
    }

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta categoria?')

        if (confirm) {
            makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Categoria removida com sucesso!');
                    getCategories();
                })
                .catch(() => {
                    toast.error('Erro ao remover produto. Categoria vinculada a um produto cadastrado.')
                })
        }
    }

    useEffect(() => {
        getCategories();
    }, [getCategories]);

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

            {isLoading ? <CardLoader /> : (
                <div className="admin-list-container">
                    {categoriesResponse?.content.map(category => (
                        <Card category={category} key={category.id} onRemove={onRemove} />
                    ))}
                </div>
            )}


            {categoriesResponse && <Pagination
                totalPages={categoriesResponse?.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
            />}
        </div>
    )
}

export default List;