const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        ctx.status = 401;
        return;
    }

    return next();
}

module.exports = checkLoggedIn;

// 로그인 상태가 아니면 401 반환 