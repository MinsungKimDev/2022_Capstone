import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../common/SubInfo";

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color:${palette.gray[6]};
        }
    }
    
    p {
        margin-top: 2rem;
    }
`;



const PostItem = ({ post }) => {
    const { publishedDate, username, title, body, _id } = post;
    return (
        <PostListBlock>
            <h2>
                <Link to={`/@${username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo 
                username={username}
                publishedDate={new Date(publishedDate)} 
            />
            <p>{body}</p>
        </PostListBlock>
    );
        
};

const PostList = ({posts, loading, error, showWriteButton }) => {
    if(error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }
    return(
        <PostItemBlock>
            <WritePostButtonWrapper>
                {showWriteButton&&(<Button cyan to="/write">
                    새 글 작성하기
                </Button>
                )}
            </WritePostButtonWrapper>

            {!loading && posts && (
            <div>
                {posts.map(post =>(
                <PostItem post={post} key={post._id} />
                ))}
            </div>
            )}
        </PostItemBlock>
    );
};

export default PostList;