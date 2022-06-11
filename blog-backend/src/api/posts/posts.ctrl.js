const { Post } = require('../../models');  //생성한 모델을 불러온다. 

//블로그 포스팅
exports.write = async (ctx) => {
  const { title, body, level } = ctx.request.body;
  const newPost = { id:Date.now(), title: title, body: body, username: ctx.state.user.username, level:level};

  try {
    const pt = await Post.create(newPost);
    ctx.body = newPost;
    console.log((await pt.getUser()).username);

  } catch (e) {
    ctx.throw(500, e);
  }
}

//아이디로 블로그 글 지우기 
exports.remove = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            ctx.status = 404;
            return;
        }
        await post.destroy();
        ctx.status = 204; // No content 
    } catch (e) {
        ctx.throw(500, e);
    }
}

//아이디로 블로그 글 수정하기 
exports.update = async ctx => {
    const { id } = ctx.params;
    const { title, body, level } = ctx.request.body;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            ctx.status = 404;
            return;
        }

        post.title = title;
        post.body = body;
        post.level = level;
        await post.save();
        ctx.body = post;

    } catch (e) {
        ctx.throw(500, e);
    }
}


//포스트 전체 불러오기
exports.list = async (ctx) => {
    const page = parseInt(ctx.query.page || '1', 10);
    // 1페이지당 10개의 row씩, 즉 쿼리로 &page=1을 넣으면 1페이지,  &page=2를 넣으면 2페이지의 row를 가지고 온다.
    const { username } = ctx.query; // if username is given as query 

    let offset = 0;
    if (page < 1) {
      ctx.status = 400;
      return;
    }
  
    if (page > 1) {
      offset = 10 * (page - 1);
    }

    const query = {
        ...(username ? { where : { username : username }} : {}),
        order: [['id', 'DESC']],
        // 정렬 기준 : id, 오름차순 : ASC, 내림차순 : DESC
        limit: 10,
        offset: offset
    }
    // username 값이 유효할 때만 query 객체 안에 where 값을 넣어준다. 
  
    try {
      const posts = await Post.findAll({query});

      const postCount = await Post.count({query});
      ctx.set('Last-Page', Math.ceil(postCount / 10)); //마지막 페이지를 알 수 있도록 커스텀 HTTP 헤더 설정
      ctx.body = posts //내용 길이 제한
        .map((post) => ({
          post,
          body:
            post.body.length < 10 ? post.body : `${post.body.slice(0, 10)}...`,
        }));
    } catch (e) {
      ctx.throw(500, e);
    }
}



exports.getPostById = async (ctx, next) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByPk(id);

    if(!post) {
      ctx.status = 404; //Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }

}

exports.checkOwnPost = async (ctx, next) => {
  const { user, post } = ctx.state;

  if (post.username !== user.username ) {
    ctx.state = 403;
    return;
  }
  return next();
}


exports.read = ctx => {
  ctx.body = ctx.state.post;
}