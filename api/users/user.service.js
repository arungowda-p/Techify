const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Role = require("_helpers/role");
const db = require('_helpers/db');
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create
};

async function authenticate({ username, password }) {
  let user = await User.findOne({ username })
  if( user && bcrypt.compareSync(password, user.hash)){
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, { expiresIn: '1d' });
    const result = Object.assign(user)
    return {
      ...user.toJSON(),
      token
  };
  }
}

async function getAll() {
  const users = await User.find()
  return users.map((u) => {
    delete u.hash
    return u
  });
}

async function getById(id) {
  const user = await User.findById(id)
  if (!user) return;
  delete user.hash;
  return user;
}

async function create(userParam) {
  if (await User.findOne({ username: userParam.username })) {
    throw `Username ${userParam.username} is already taken.`;
  }
  const user = new User(userParam);
  console.log(userParam)
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  await user.save();
}
