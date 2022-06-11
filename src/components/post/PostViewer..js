import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 30px;
        line-height: 1.5;
        text-align: center;
        margin: 0;
    }
`;

// const SubInfo = styled.div`
//     margin-top: 1rem;
//     color: ${palette.gray[6]};
    
//     span + span:before {
//         color: ${palette.gray[5]};
//         padding-left: 0.25rem;
//         padding-right: 0.25rem;
//         content: '\\B7';
//     }
// `;

// const Tags = styled.div`
//     margin-top: 0.5rem;
//     .tag {
//         display: inline-block;
//         color: ${palette.cyan[7]};
//         text-decoration: none;
//         margin-right: 0.5rem
//         &:hover {
//             color: ${palette.cyan[6]};
//         }
//     }
// `;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
    position: relative;
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
    if(error) {
        if(error.response && error.response.status ===404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>오류 발생!</PostViewerBlock>;
    }

    if(loading || !post) {
        return null;
    }

    const { title, body, username, createdAt } = post;
    return (
        <PostViewerBlock>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={username}
                    createdAt={createdAt}
                    hasMarginTop
                />
            </PostHead>
            {actionButtons}
            <PostContent
                dangerouslySetInnerHTML={{ __html: body }} 
            />
            <div style={{marginTop:'30%', textAlign:'center'}}>
                <ThumbUpOffAltIcon/>  
            </div>
        </PostViewerBlock>
    );
};

export default PostViewer;