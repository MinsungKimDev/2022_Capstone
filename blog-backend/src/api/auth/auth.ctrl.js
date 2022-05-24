const User = require('../../models/user');
const Joi = require('joi');

exports.register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findOne({ where: { username: username } });
    if (exists) {
      ctx.status = 409; //Conflict
      return;
    }

    const user = new User({ username: username, password: password});
    await user.save();

    const data = user.toJSON();
    ctx.body = data;

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000*60*60*24*7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
}; //회원가입

//로그인
exports.login = async (ctx) => {

  const { username, password } = ctx.request.body;

  if (!username || !password ) {
    ctx.status = 401; //Unauthorized
    return;
  }

  try {

    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.validPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    const data = user.toJSON();
    delete data.password;

    ctx.body = data;

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000*60*60*24*7,
      httpOnly: true,
    });

  } catch (e) {
    ctx.throw(500, e);
  }

}; // 로그인

// 로그아웃
exports.logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No content
  
}; // 로그아웃

exports.check = async ctx => {
  const { user } = ctx.state;
  if(!user) {
      ctx.status = 401;
      return;
  }
  ctx.body = user;
};