import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from '../../modules/user';
import { withRouter } from "react-router-dom";

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user})=>({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
//eslint-disable-line no-unused-vars
    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const hideError = () => {
        setTimeout(()=>{ setError(false) }, 4000)
        clearTimeout();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        //하나라도 비어있으면
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
        if(password !== passwordConfirm){
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({form: 'register', key: 'password', value:''}));
            dispatch(changeField({form: 'register', key: 'passwordConfirm', value:''}));
            hideError();
            return;
        }
        dispatch(register({ username, password }));
    };
    // 컴포넌트가 처음 렌더링 될 때  form을 초기화함
    useEffect(()=> {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    
    
    // 회원가입 성공/실패 처리
    useEffect(() => {
        if(authError) {
            //계정명이 이미 존재할 때
            if(authError.response.status===409) {
                setError('이미 존재하는 계정명입니다.');
                hideError();
                return;
            }
            //기타이유
            setError('회원가입 실패');
            hideError();
            return;
        }
        if(auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
            alert("회원가입 성공");
        }
    }, [auth, authError, dispatch]);

    useEffect(()=>{
        if(user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    },[history, user]);

    return (
        <AuthForm 
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit} 
            error={error}
        />
    );
};

export default withRouter(RegisterForm);