import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Card = () => {
    return (
        <div className="card-base categories-card-admin">
            <div className="row">
                <div className="col-7 pl-5 py-4 text-left categories-card-name-admin">Categorias</div>
                <div className="col-5 py-4">
                    <Link to={`/admin/categories/`}
                        type="button"
                        className="btn btn-outline-secondary categories-edit-button border-radius-10 mr-5">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger categories-delete-button border-radius-10 ml-5"
                    >
                        EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    );
}


export default Card;