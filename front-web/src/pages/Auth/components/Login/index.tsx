import React from 'react';
import AuthCard from '../AuthCard';
import './styles.scss';

const Login = () => {
    return (
        <AuthCard title="Login" >
            <form className="login-form">
                <h1>Formulário de Login</h1>
            </form>
        </AuthCard>
    );
}

export default Login;