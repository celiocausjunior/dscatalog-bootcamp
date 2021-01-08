import React, { useEffect, useState } from 'react';
import './styles.scss';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg'
import Select from 'react-select';
import { Category } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';

export type FilterForm = {
    name?:string;
    categoryId?:number;
}

type Props = {
    onSearch: (filter: FilterForm) => void;
}

const ProductFilters = ({onSearch}:Props) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [name, setName] = useState('');


    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest ({url:'/categories'})
        .then(response => setCategories(response.data.content))
        .finally(() => setIsLoadingCategories(false)) 
    }, [])
    
    const handleChangeName = (name: string) => {
        setName(name);
        onSearch({name});
    }

    return (

        <div className="card-base product-filters-containers">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Pesquisar Produto"
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name="categories"
                options={categories}
                isLoading={isLoadingCategories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="product-categories-select"
                placeholder="Categorias"
                inputId="categories"
                
            />
            <button className="btn btn-outline-secondary border-radius-10">
                 LIMPAR FILTRO
            </button>
        </div>
    );
}

export default ProductFilters;