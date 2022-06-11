import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../../components/common/Responsive"
import palette from "../../lib/styles/palette";
import SubInfo from "../../components/common/SubInfo";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { create } from "@mui/material/styles/createTransitions";


// import "./PostList.css"
// import { postsSaga } from "../../modules/posts";

const PostListBlock = styled(Responsive)`
    display: inline-block;
    width: 50%;
    border: 1px groove;
    height: 300px;
    margin-top: 10px;
    vertical-align: top;
    position: relative;
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

const PostItem = ( {post, listbody} ) =>{
    const { createdAt, username, title, id} = post;
    const [like, setLike] = useState(0);
    return (
    <PostListBlock>
        <div style={{margin:'auto',position: 'absolute', bottom:0, width: '80%'}}>
      <ImageList sx={{ width: '100%', height: 300 }} cols={1}>
          <ImageListItem >
            <p>{listbody}</p>
            <div><h3> 
              <span onClick={() => { setLike(like + 1); }} > 👍 </span> {like} </h3>
                </div>
            <ImageListItemBar
              title={<h2>
                <Link to={`/@${username}/${id}`}>{title}</Link>
            </h2>}
              subtitle={<SubInfo 
                username={username}
                createdAt={createdAt} 
            />
        }
            />
          </ImageListItem>

      </ImageList>
      </div>
      </PostListBlock>
    );
  }


const PostList2 = ({posts, loading, error, showWriteButton }) => {
    if(error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }
    return(
        <PostItemBlock>
            <WritePostButtonWrapper>
            </WritePostButtonWrapper>

            {!loading && posts && (
            <>
                {posts.map(post =>(
                <PostItem post={post.post} key={post.post.id} listbody={post.body} />
                ))}
            </> 
            )}
        </PostItemBlock>
    );
};

export default PostList2;
