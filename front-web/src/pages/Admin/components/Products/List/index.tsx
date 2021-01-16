import Pagination from 'core/components/Pagination';
import ProductFilters, { FilterForm } from 'core/components/ProductFilters';
import { ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card'
import CardLoader from '../../../../../core/components/Loaders/CardLoader'
import './styles.scss'

const List = () => {
    const history = useHistory();
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?:FilterForm) => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id',
            name: filter?.name,
            categoryId: filter?.categoryId
        }

        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreate = () => {
        history.push("/admin/products/create");
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir o produto selecionado?');

        if (confirm) {
            makePrivateRequest({ url: `/products/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info("Produto removido com sucesso!");
                    getProducts();
                })
                .catch(() => {
                    toast.error("Erro ao excluir o produto");
                })
        }
    }

    return (
        <div className="admin-products-list">
           <div className="d-flex">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
                </button>
            <span className="admin-product-filter ml-5 justify-center">
                <ProductFilters onSearch={filter => getProducts(filter)} />
            </span>
            </div>
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Card product={product} key={product.id} onRemove={onRemove} />
                    ))
                )}
                {productsResponse && (
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />)}
            </div>
        </div>
    );
}
export default List;