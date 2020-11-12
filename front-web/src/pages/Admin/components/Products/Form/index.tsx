import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState ={
    name?:string;
    price?:string;
    category?:string;
}

const Form = () => {
    const [formData, setFormData] = useState<FormState>({});

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }


    return (

        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            value={formData.category}
                            name="category"
                        >
                            <option value="livros">Livros</option>
                            <option value="computadores">Computadores</option>
                            <option value="eletronicos">Eletrônicos</option>
                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;