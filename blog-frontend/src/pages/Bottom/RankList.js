import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Responsive from "../../components/common/Responsive";
import palette from "../../lib/styles/palette";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';

const PostListBlock = styled(Responsive)`
    display: inline-block;
    width: 50%;
    border: 1px groove;
    height: 300px;
    height: 110px;
    /*margin-top: 10px;*/
    vertical-align: top;
    position: relative;
`;

const SearchWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 1rem;
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
    const [like, setLike] = useState(false);
    const [unlike, setUnlike] = useState(false);
    const [likecnt, setLikecnt] = useState(0);
    return (
    <PostListBlock>
        <Link to={`/@${username}/${id}`}>
        <div>
            <h3> 
                <span onClick={() => { setLike(like + 1); }} > 👍 </span> {like}
            </h3>
        </div>
        <div style={{margin:'auto',position: 'absolute', bottom:0, width: '80%', }}>
        <ImageList sx={{ width: '100%', height: '100%' }} cols={1}>
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
            <p></p>
            <ImageListItemBar title={<h2>{title}</h2>}/>
            </ImageListItem>

        </ImageList>
        </div>
        </Link>
        </PostListBlock>
    );
}


const RankList = ({posts, loading, error, showWriteButton }) => {

    const [query, setQuery] = useState("");

    if(error) {
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
    }

    
    return(
        <>
        <SearchWrapper>
        <div className='main'>
                <div className = "body">
                    <div className='search2'> 
                        <SearchIcon style={{marginRight:"6px"}}/>
                            <input 
                                type='text'
                                placeholder='요리이름으로 검색' 
                                className='search'
                                onChange={(e) => setQuery(e.target.value)}  
                            />
                    </div>
                </div>
         </div>
        </SearchWrapper>
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
                        <PostItem post={post.post} key={post.post.view} listbody={post.body} />
                ))}
            </> 
            )}
        </PostItemBlock>
        </>
    );
};

export default RankList;
