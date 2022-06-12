import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import AppBar from "../../components/common/AppBar"
import { logout } from "../../modules/user";
import { Link } from 'react-router-dom';

const HeaderContainer2 = () => {
    const { user } = useSelector(({ user }) => ({user: user.user}));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        alert("로그아웃 되었습니다.");
    }
    return (
        <AppBar user={user} onLogout={onLogout}/>
        );

};

export default HeaderContainer2;