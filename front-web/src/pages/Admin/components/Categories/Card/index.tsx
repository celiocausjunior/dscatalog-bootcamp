import { Category } from 'core/types/Categories';
import ProductCard from 'pages/Catalog/components/ProductCard';
import React from 'react';
import { Link } from 'react-router-dom';
import { DiagnosticCategory } from 'typescript';
import Categories from '..';
import './styles.scss';

type Props = {
    category: Category;
}


const Card = ({ category }: Props) => {
    return (
        <div className="card-base categories-card-admin">
            <div className="row">
                <div className="col-7 pl-5 py-4 text-left categories-card-name-admin">
                    {category?.name}
                </div>
                <div className="col-5 py-4">
                    <Link to={`/admin/categories/`}
                        type="button"
                        className="btn btn-outline-secondary categories-edit-button border-radius-10 mr-5">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger categories-delete-button border-radius-10"
                    >
                        EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    );
}


export default Card;