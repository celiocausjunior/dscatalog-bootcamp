import { makePrivateRequest } from 'core/utils/request';
import React from 'react';
import { useForm } from 'react-hook-form';
import BaseForm from '../../BaseForm';

type FormState = {
    category: string;
}

const Form = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();

    const onSubmit = (formData: FormState) => {
        console.log(formData);
        makePrivateRequest({ url: '/categories', method: 'POST', data: formData })
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
                                    maxLength: { value: 5, message:"O campo deve ter no máximo 60 caracteres"},
                                })}
                                name="category"
                                type="text"
                                className="form-control"
                                placeholder="Nome da categoria"
                            />
                            {errors.category && (
                                <div className="invalid-feedback d-block">
                                    {errors.category.message}
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