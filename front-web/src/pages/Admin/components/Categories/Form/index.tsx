import React, { Children } from 'react';
import BaseForm from '../../BaseForm';

type FormState = {
    name?: string;
}

const Form = () => {
    return (
        <BaseForm title="CADASTRAR UMA CATEGORIA">
            <div className="row">
                <div className="col-6">
                    <input type="text" className="form-control" />
                </div>
            </div>

        </BaseForm>
    );
}

export default Form;