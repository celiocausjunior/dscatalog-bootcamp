import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';


type FormState = {
    name: string;
}

type ParamsType = {
    categoryId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { categoryId } = useParams<ParamsType>(); //captura id dinâmico da Url
    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? "EDITAR UMA CATEGORIA" : "CADASTRAR UMA CATEGORIA";

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
            .then(response => {
                setValue('name', response.data.name); // carega os dados do formulário
            })
        }
    }, [categoryId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/categories/${categoryId}` : '/categories', 
            method: isEditing ? 'PUT' : 'POST', 
            data
         })
            .then(() => {
                toast.info('Categoria salva com sucesso!');
                history.push('/admin/categories')
            })
            .catch(() => {
                toast.error('Erro ao salvar categoria!');
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
            title={formTitle}
            >
                <div className="row">
                    <div className="col-6">
                        <div>
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: "O campo deve ter no mínimo 5 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres" },
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