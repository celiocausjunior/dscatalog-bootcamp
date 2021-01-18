import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss'


type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

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
                    setValue('firstName', response.data.firstName);// carega os dados do formulário
                    setValue('lastName', response.data.lastName);
                    setValue('email', response.data.email);
                    setValue('password', response.data.password);

                    
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
                        <div className="form-content">
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 3, message: "O campo deve ter no mínimo 3 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres" },
                                })}
                                name="firstName"
                                type="text"
                                className="form-control mb-3"
                                placeholder="Primeiro Nome"
                            />
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    minLength: { value: 3, message: "O campo deve ter no mínimo 3 caracteres" },
                                    maxLength: { value: 60, message: "O campo deve ter no máximo 60 caracteres" },
                                })}
                                name="lastName"
                                type="text"
                                className="form-control mb-3"
                                placeholder="Sobrenome"
                            />
                            <input
                                ref={register({
                                    required: "Campo obrigatório",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email inválido"
                                    }
                                })}
                                name="email"
                                type="email"
                                className="form-control mb-3"
                                placeholder="E-mail"
                            />
                                {!isEditing ?
                                <input type="password" className={`form-control input-base ${errors.password ? 'is-invalid' : ''} `}
                                placeholder="Senha"
                                name="password"
                                ref={register({ required: "Campo obrigatório" })}
                            /> :"" }
                            
                            </div>
                            {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
                                </div>
                            )}
                        </div>
                    </div>
            </BaseForm>
        </form>
    );
}

export default Form;