import axios from "axios";
// import { response } from "express";

const client = axios.create();

    // client.defaults.baseURL = 'https://external-api-server.com/'

    // client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

    // axios.interceptors.response.use(\
    //     response=> {
    //         return response;
    //     },
    //     error => {
    //         return Promise.reject(error);
    //     }
    // })

export default client;
