import React from "react";
import { Route } from 'react-router-dom';
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import Rank from "./pages/Bottom/Rank";
import Alarm from "./pages/Bottom/Alarm";
import MyPage from "./pages/Bottom/MyPage"
import Upload from "./pages/Bottom/Upload"

const App= () => {
  return (
    
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact/>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={Rank} path="/Bottom/Rank"/>
      <Route component={Alarm} path="/Bottom/Alarm"/>
      <Route component={MyPage} path="/Bottom/Mypage"/>
      <Route component={Upload} path="/Bottom/Upload"/>
      
    </>
  );
};
export default App;