import qs from 'qs'
import client from "./client";

export const writePost = ({ title, body, level, thumbnail }) => 
    client.post('/api/posts', { title, body, level, thumbnail });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
    const queryString = qs.stringify({
        page,
        username,
    });
    return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, level, thumbnail }) =>
    client.patch(`api/posts/${id}`, {
        title,
        body,
        level,
        thumbnail
    });

export const removePost = (id) => client.delete(`/api/posts/${id}`);