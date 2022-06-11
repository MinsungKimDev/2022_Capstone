import React from "react";
import Authtemplate from "../components/auth/AuthTemplate";
import RegisterForm from "../containers/auth/RegisterForm";

const RegisterPage = () => {
    return (
        <Authtemplate>
            <RegisterForm/>
        </Authtemplate>
    );
};

export default RegisterPage;