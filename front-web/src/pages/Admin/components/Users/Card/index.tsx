import { Users } from 'core/types/Users';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    users: Users;
    onRemove: (usersId: number) => void;
}


const Card = ({ users, onRemove }: Props) => {
    return (
        <div className="card-base categories-card-admin">
            <div className="row">
                <div className="col-7 pl-5 py-4 text-left categories-card-name-admin">
                    {users?.firstName} <span className="last-name ml-1">  {users.lastName} </span> <span className="users-email ml-5 "> {users.email} </span>
                </div>
                <div className="col-5 py-4">
                    <Link to={`/admin/users/${users.id}`}
                        type="button"
                        className="btn btn-outline-secondary categories-edit-button border-radius-10 mr-5">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger categories-delete-button border-radius-10"
                        onClick={() => onRemove(users.id)}
                    >
                        EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    );
}


export default Card;