import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';


type FormState = {
    name: string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory();

    const onSubmit = (data: FormState) => {
        console.log(data);
        makePrivateRequest({ url: '/categories', method: 'POST', data})
        .then(() => {
            toast.info('Categoria cadastrada com sucesso!');
            history.push('/admin/categories')
        })
        .catch(() => {
            toast.error('Erro ao cadastrar categoria!');
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="CADASTRAR UMA CATEGORIA">
                <div className="row">
                    <div className="col-6">
                        <div>
                            <input
                                ref={register({ 
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message:"O campo deve ter no mínimo 5 caracteres"},
                                    maxLength: { value: 60, message:"O campo deve ter no máximo 60 caracteres"},
                                })}
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder="Nome da categoria"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;