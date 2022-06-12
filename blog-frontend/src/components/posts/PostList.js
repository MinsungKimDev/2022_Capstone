import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../common/Responsive";
import palette from "../../lib/styles/palette";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import './search.css';

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
    const { view, username, title, id, thumbnail, level} = post;
    let levelString;

    switch (level) {
        case 0:
            levelString = '초급';
            break;
        case 1:
            levelString = '중급';
            break;
        case 2:
            levelString = '고급';
            break;
        case 3:
            levelString = '자취9단';
            break;
        default:
            break;
    }


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
            <h2>{title}<span> 👀 {view} </span>&nbsp;&nbsp;<span>{levelString}</span></h2> 
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
        <div className='search'> 
            <SearchIcon style={{color:"black", marginLeft:"10px", marginRight:"10px"}}/>
                <input 
                    type='text'
                    placeholder='요리명 또는 재료명..' 
                    onChange={(e) => setQuery(e.target.value)}  
                />
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