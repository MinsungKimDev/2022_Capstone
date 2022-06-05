import React, { useEffect, useState } from "react";
import WriteActionButtons from "../../components/write/WriteActionButton";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import write, { writePost } from '../../modules/write'

const WriteActionButtonsContainer = ({history}) => {
    const [nullPostTitle, setNullPostTitle] = useState("");
    const [nullPostBody, setNullPostBody] = useState("");
    const [nullPostLevel, setNullPostLevel] = useState("");

    const dispatch = useDispatch();
    const { title, body, level, post, postError } = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        level: write.level,
        post: write.post,
        postError: write.postError,
    }));

    const hideNull = () => {
        if(title==="") {
        setTimeout(()=>{ setNullPostTitle(false) }, 4000);
        clearTimeout();
        }
        if(body===""){
            setTimeout(()=>{ setNullPostBody(false) }, 4000);
            clearTimeout();
        }
        if(level===""){
            setTimeout(()=>{ setNullPostLevel(false) }, 4000);
            clearTimeout();
        }
    };

    //포스트 등록
    const onPublish = () => {
        if(title!=="" && body!=="" && level!==""){
            dispatch(
                writePost({
                    title,
                    body,
                    level
                }),
            );
        } else {
            if(title==="") {
                alert("제목을 입력해주세요!!");
                setNullPostTitle("제목을 입력해주세요!!");
                hideNull();
            }
            if(body==="") {
                alert("내용을 입력해주세요!!");
                setNullPostBody("내용을 입력해주세요!!");
                hideNull();
            }
            if(level===""){
                alert("난이도를 선택해주세요!!");
                setNullPostLevel("난이도를 선택해주세요!!");
                hideNull();
            }
        }
    };
    //취소
    const onCancel = () => {
        history.goBack();
    };
    // 성공 혹은 실패 시 할 작업
    useEffect(() => {
        // console.log(post);
        if(post) {
            const { id, username } = post;
            history.push(`/@${username}/${id}`); 
        }
        if(postError) {
            console.log(postError);
        }
    }, [history, post, postError]);
    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} nullPostTitle={nullPostTitle} nullPostBody={nullPostBody} nullPostLevel={nullPostLevel}/>;
}

export default withRouter(WriteActionButtonsContainer);