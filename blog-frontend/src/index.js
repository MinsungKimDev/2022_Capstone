import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Youtube from './service/youtube';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import BottomNav from "./pages/BottomNav";
import HeaderContainer2 from './containers/common/HeaderContainer2';
// import axios from 'axios';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

// const httpClient = axios.create({
//   baseURL: 'https://www.googleapis.com/youtube/v3',
//   params: {key:process.env.REACT_APP_YOUTUBE_API_KEY },
// });
// const youtube = new Youtube(httpClient);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if(!user) return;

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}
sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <HeaderContainer2/>
    <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();