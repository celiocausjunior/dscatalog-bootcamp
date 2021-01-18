import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';


type FormState = {
    firstName: string;
}

type ParamsType = {
    usersId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { usersId } = useParams<ParamsType>(); //captura id dinâmico da Url
    const isEditing = usersId !== 'create';
    const formTitle = isEditing ? "EDITAR UMA USUARIO" : "CADASTRAR UM USUARIO";

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/users/${usersId}` })
            .then(response => {
                setValue('firstName', response.data.name); // carega os dados do formulário
            })
        }
    }, [usersId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ 
            url: isEditing ? `/users/${usersId}` : '/users', 
            method: isEditing ? 'PUT' : 'POST', 
            data
         })
            .then(() => {
                toast.info('Usuario salvo com sucesso!');
                history.push('/admin/users')
            })
            .catch(() => {
                toast.error('Erro ao salvar usuario!');
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
                                placeholder="Primeiro Nome"
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
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