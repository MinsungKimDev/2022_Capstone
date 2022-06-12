import React, {useState} from "react";
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
import { create } from "@mui/material/styles/createTransitions";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import './search.css';
import { textAlign } from "@mui/system";

// import "./PostList.css"
// import { postsSaga } from "../../modules/posts";

const PostListBlock = styled(Responsive)`
    display: inline-block;
    width: 90%;
    margin: 2.5% 5% 2.5% 5%;
    padding: 0;
    border: solid 1px gray;
    height: 200px;
    /*margin-top: 10px;*/
    vertical-align: top;
    position: relative;
`;

const PostItemBlock = styled.div`
    padding-top: 1rem;
    padding-bottom: 10rem;
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
        width:100%;
        height:100%;
        margin-top: 2rem;
        font-size: 12px;
        text-align: center;
    }
`;

const PostItem = ( {post} ) =>{
    const { view, username, title, id, thumbnail} = post;
    const [like, setLike] = useState(false);
    const [unlike, setUnlike] = useState(false);
    const [likecnt, setLikecnt] = useState(0);

    return (
    <PostListBlock>

        <Link to={`/@${username}/${id}`}>
        <div className="recipeThumbnail"  dangerouslySetInnerHTML={{ __html: thumbnail }} >
        </div>
        <div style={
            {
                backgroundColor:'gray', 
                margin: 0, paddingTop: 10, 
                position: 'absolute', 
                bottom:0, 
                width: '100%', 
                height: '20%',
                color: 'white',
                textAlign: 'center',
                zIndex: 3
            }}>
            <h2>{title} <span> 👀 </span> {view}</h2> 
        </div>
        </Link>
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

    const [query, setQuery] = useState("");

    if(error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }

    
    return(
        <>
        
        <div className='main'>
                <div className = "body">
                    <div className='search'> 
                        <SearchIcon style={{color:"black", marginLeft:"10px", marginRight:"10px"}}/>
                            <input 
                                type='text'
                                placeholder='요리명 또는 재료명..' 
                                onChange={(e) => setQuery(e.target.value)}  
                            />
                    </div>
                </div>
            </div>
        <PostItemBlock>
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
            {!loading && posts && (
            <>
                {posts.filter((posts)=>
                    posts.post.title.toLowerCase().includes(query) ||
                    posts.post.body.toLowerCase().includes(query)
                    ).map((post) => (
                        <PostItem post={post.post} key={post.post.id} listbody={post.body} />
                ))}
            </> 
            )}
        </PostItemBlock>
        </>
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