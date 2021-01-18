import Pagination from 'core/components/Pagination';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../../../../../core/components/Loaders/CardLoader'
import './styles.scss'
import { UsersResponse } from 'core/types/Users';


const List = () => {
    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();


    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
        }
        setIsLoading(true);
        makeRequest({ url: '/users', params })
            .then(response => setUsersResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleCreate = () => {
        history.push('/admin/users/create')
    }

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este usuario?')

        if (confirm) {
            makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Usuario removido com sucesso!');
                    getUsers();
                })
                .catch(() => {
                    toast.error('Erro ao remover usuario.')
                })
        }
    }


    return (
        <div className="admin-products-list">
            <div className="d-flex">
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>

            {isLoading ? <CardLoader /> : (
                <div className="admin-list-container">
                   {usersResponse?.content.map(user => (
                        <Card users={user} key={user.id} onRemove={onRemove} />
                    ))} 
                </div>
            )}


            {usersResponse && <Pagination
                totalPages={usersResponse?.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
            />}
        </div>
    )
}

export default List;