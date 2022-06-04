import React, { useEffect } from "react";
import WriteActionButtons from "../../components/write/WriteActionButton";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { writePost } from '../../modules/write'

const WriteActionButtonsContainer = ({history}) => {
    const dispatch = useDispatch();
    const { title, body, level, post, postError } = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        level: write.level,
        post: write.post,
        postError: write.postError,
    }));
    //포스트 등록
    const onPublish = () => {
        dispatch(
            writePost({
                title,
                body,
                level
            }),
        );
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
    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
}

export default withRouter(WriteActionButtonsContainer);