import qs from 'qs'
import client from "./client";

export const writePost = ({ title, body }) => 
    client.post('/api/posts', { title, body });

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
    const queryString = qs.stringify({
        page,
        username,
    });
    return client.get(`/api/posts?${queryString}`);
};