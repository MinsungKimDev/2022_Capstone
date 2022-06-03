import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../common/SubInfo";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';


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
    const { publishedDate, username, title, id} = post;
    return (
    <PostListBlock>
        <div style={{margin:'auto',position: 'absolute', bottom:0, width: '80%'}}>
      <ImageList sx={{ width: '100%', height: 300 }} cols={1}>
        {/* <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div"><h3>Ranking</h3></ListSubheader>
        </ImageListItem>
         */}

          <ImageListItem >
            {/* <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            /> */}
            <p>{listbody}</p>

            <ImageListItemBar
              title={<h2>
                <Link to={`/@${username}/${id}`}>{title}</Link>
            </h2>}
              subtitle={<SubInfo 
                username={username}
                publishedDate={publishedDate} 
            />}
            //   actionIcon={
            //     <IconButton
            //       sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            //       aria-label={`info about ${item.title}`}
            //     >
            //       <InfoIcon />
            //     </IconButton>
            //   }
            />
            {/* <p>{listbody}</p>
            <div style={{margin:'auto',position: 'absolute', bottom:0}}>
            <h2>
                <Link to={`/@${username}/${id}`}>{title}</Link>
            </h2>
            <SubInfo 
                username={username}
                publishedDate={publishedDate} 
            />
            </div> */}
          </ImageListItem>

      </ImageList>
      </div>
      </PostListBlock>
    );
  }

// const PostItem = ( {post, listbody} ) => {
//     const { publishedDate, username, title, id} = post;
//     //console.log(`id : ${id}`);
//     //console.log(`body : ${body}`);
//     //console.log(`publishedDate : ${publishedDate}`);
//     //console.log(`username : ${username}`);
//     //console.log(`title : ${title}`);
//     return (
//         <PostListBlock>
//             <p>{listbody}</p>
//             <div style={{margin:'auto',position: 'absolute', bottom:0}}>
//             <h2>
//                 <Link to={`/@${username}/${id}`}>{title}</Link>
//             </h2>
//             <SubInfo 
//                 username={username}
//                 publishedDate={publishedDate} 
//             />
//             </div>
//         </PostListBlock>
//     );

// };

const PostList = ({posts, loading, error, showWriteButton }) => {
    if(error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }
    return(
        <PostItemBlock>
            <div style={{textAlign: 'center', fontSize: "16px", fontWeight: 'bolder', fontFamily:"GrapeNuts-Regular"}}>
                홈 게시판
            </div>
            <WritePostButtonWrapper>
                <Link to="/write">
                {showWriteButton&&(<Fab
                color="secondary"
                    sx={{
                        position: 'fixed',
                        bottom: (theme) => theme.spacing(10),
                        right: (theme) => theme.spacing(4),
                    }}
                >
                    <AddIcon />
                </Fab>)}
                </Link>
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

export default PostList;

/*
<Link to = '/write'>
                {showWriteButton&&(<Button cyan>
                    새 글 작성하기
                </Button>
                )}
                </Link>
*/