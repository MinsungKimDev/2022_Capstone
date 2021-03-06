import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter  } from "react-router-dom";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";


const LoginForm = ({history}) => {
    const [error, setError]= useState("");
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        auth: auth.auth,
        authError: auth.authError,
        form: auth.login,
        user: user.user,
    }));

    const hideError = () => {
        setTimeout(()=>{ setError(false) }, 4000)
        clearTimeout();
    };

    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const{ username, password } = form;
        if([username].includes('')) {
            setError('아이디를 입력하세요.');
            hideError();
            return;
        }
        if([password].includes('')) {
            setError('비밀번호를 입력하세요.');
            hideError();
            return;
        }
        dispatch(login({username, password}));
    };

    useEffect(()=> {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(()=> {
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            hideError();
            return; 
        }
        if(auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    },[auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.reload(true);
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    },[history,user]);

    return (
        <AuthForm 
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);