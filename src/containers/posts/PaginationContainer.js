import React from "react";
import Pagination from "../../components/posts/Pagination";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "qs";

const PaginationContainer = ({ location, match }) => {
    const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['post/LIST_POSTS'],
    }));

    if(!posts || loading) return null;

    const { username } = match.params;

    const { page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination 
            username={username}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);