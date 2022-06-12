import React from 'react';
import Authtemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
    console.log(window.location.pathname);
    return (
        <Authtemplate>
            <LoginForm/>
        </Authtemplate>
    )
};

export default LoginPage;