import { Category } from 'core/types/Categories';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    category: Category;
    onRemove: (categoryId: number) => void;
}


const Card = ({ category, onRemove }: Props) => {
    return (
        <div className="card-base categories-card-admin">
            <div className="row">
                <div className="col-7 pl-5 py-4 text-left categories-card-name-admin">
                    {category?.name}
                </div>
                <div className="col-5 py-4">
                    <Link to={`/admin/categories/${category.id}`}
                        type="button"
                        className="btn btn-outline-secondary categories-edit-button border-radius-10 mr-5">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger categories-delete-button border-radius-10"
                        onClick={() => onRemove(category.id)}
                    >
                        EXCLUIR
                    </button>
                </div>

            </div>
        </div>
    );
}


export default Card;