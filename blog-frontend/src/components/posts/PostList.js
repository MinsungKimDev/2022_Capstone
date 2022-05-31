import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../common/SubInfo";
// import { postsSaga } from "../../modules/posts";

const PostListBlock = styled(Responsive)`
    display: inline-block;
    width: 33.3%;
    border: 1px solid;
    height: 150px;
    position: relative;
    margin-top: 10px;
    vertical-align: top;
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
        float: top;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 0;
        margin-top: 0;
        text-align: center;
        &:hover {
            color:${palette.gray[6]};
        }
    }
    
    p {
        margin-top: 2rem;
        font-size: 12px;
        text-align: center;
    }
`;



const PostItem = ( {post, listbody} ) => {
    const { publishedDate, username, title, id} = post;
    //console.log(`id : ${id}`);
    //console.log(`body : ${body}`);
    //console.log(`publishedDate : ${publishedDate}`);
    //console.log(`username : ${username}`);
    //console.log(`title : ${title}`);
    return (
        <PostListBlock>
            <p>{listbody}</p>
            <div style={{margin:'auto',position: 'absolute', bottom:0}}>
            <h2>
                <Link to={`/@${username}/${id}`}>{title}</Link>
            </h2>
            <SubInfo 
                username={username}
                publishedDate={publishedDate} 
            />
            </div>
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
                <PostItem post={post.post} key={post.post.id} listbody={post.body} />
                ))}
            </div>
            )}
        </PostItemBlock>
    );
};

export default PostList;