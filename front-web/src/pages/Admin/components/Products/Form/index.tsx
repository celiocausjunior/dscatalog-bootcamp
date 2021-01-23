import React, { useEffect, useState } from 'react';
import BaseForm from '../../BaseForm';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import './styles.scss';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'core/types/Categories';
import ImageUpload from '../ImageUpload';

type FormState = {
    name?: string;
    price?: string;
    description?: string;
    imgUrl?: string;
    categories?: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const isEditing = productId !== 'create';
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');



    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('categories', response.data.categories);
                    setProductImgUrl(response.data.imgUrl);
                })
        }
    }, [productId, isEditing, setValue]);


    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false))
    }, [])


    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl
        }
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.info("Produto cadastrado com sucesso!");
                history.push("/admin/products")
            })
            .catch(() => {
                toast.error("Erro ao cadastrar o produto");
            })
    }

    const onUploadSuccess=(imgUrl: string)=> {
        setUploadedImgUrl(imgUrl);
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm
                title={isEditing ? "EDITAR PRODUTO" : "CADASTRAR PRODUTO"}
            >
                <div className="row">
                    <div className="col-6">

                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="name"
                                type="text"
                                className="form-control input-base "
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{ required: true }}
                                options={categories}
                                control={control}
                                isLoading={isLoadingCategories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                isMulti
                                classNamePrefix="categories-select"
                                placeholder="Categorias"
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo Obrigatório
                                </div>
                            )}

                        </div>
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                                <ImageUpload
                                onUploadSuccess={onUploadSuccess}
                                productImgUrl={productImgUrl}
                                />
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea
                            ref={register({ required: "Campo obrigatório" })}
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10} />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;