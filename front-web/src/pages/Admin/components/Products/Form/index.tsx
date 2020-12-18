import React from 'react';
import BaseForm from '../../BaseForm';
import { useForm } from 'react-hook-form';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';

type FormState = {
    name?: string;
    price?: string;
    description?: string;
    imageUrl?: string;
}


const Form = () => {
    const { register, handleSubmit } = useForm<FormState>();

    const onSubmit = (data: FormState) => {

        makePrivateRequest({ url: '/products', method: 'POST', data: data })
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="name"
                            type="text"
                            className="form-control input-base margin-bottom-30"
                            placeholder="Nome do produto"
                        />

                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="price"
                            type="number"
                            className="form-control input-base margin-bottom-30"
                            placeholder="Preço"
                        />
                        <input
                            ref={register({ required: "Campo obrigatório" })}
                            name="imageUrl"
                            type="text"
                            className="form-control input-base margin-bottom-30"
                            placeholder="Imagem do Produto"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            ref={register({ required: "Campo obrigatório" })}
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;