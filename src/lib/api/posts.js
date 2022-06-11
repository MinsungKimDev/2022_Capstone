import qs from 'qs'
import client from "./client";

export const writePost = ({ title, body, level }) => 
    client.post('/api/posts', { title, body, level });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
    const queryString = qs.stringify({
        page,
        username,
    });
    return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, level }) =>
    client.patch(`api/posts/${id}`, {
        title,
        body,
        level
    });

export const removePost = (id) => client.delete(`/api/posts/${id}`);