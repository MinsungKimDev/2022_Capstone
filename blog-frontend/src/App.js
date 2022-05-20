import React from "react";
import { Route } from 'react-router-dom';
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import korean from "./pages/food/korean";
import japanese from "./pages/food/japanese"
import chinese from "./pages/food/chinese";
import fastfood from "./pages/food/fastfood";
import other from "./pages/food/other";

const App= () => {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact/>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
      <Route component={korean} path="/food/korean"/>
      <Route component={japanese} path="/food/japanese"/>
      <Route component={chinese} path="/food/chinese"/>
      <Route component={fastfood} path="/food/fastfood"/>
      <Route component={other} path="/food/other"/>     

    </>
  );
};
export default App;