const Util = require("./util");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const { Pool } = require("pg");
const pool = new Pool();

module.exports = {
  async create(event) {
    console.log(event.body);
    const body = JSON.parse(event.body);

    let { value, error } = userSchema.validate(body);
    if (error) return Util.envelop(error, 400);

    try {
      const usersWithThisUsername = await getUserByUsername(value.username);
      if (usersWithThisUsername.length > 0) {
        return Util.envelop("username already taken", 400);
      }

      const usersWithThisEmail = await getUserByEmail(value.email);
      if (usersWithThisEmail.length > 0) {
        return Util.envelop("email already taken", 400);
      }

      value.password = bcrypt.hashSync(value.password, 5);
      let res = insertUser(value);

      return Util.envelop(res, 201);
    } catch (err) {
      return Util.envelop(err.message, 500);
    }
  },
  async get(event) {
    return Util.envelop("Bruno Beserra Vieira");
  },
};

const getUserByUsername = async (username) => {
  return await pool.query(
    "getByUsername",
    "SELECT id, username, email, password, created_on, last_login FROM public.users WHERE username = $2",
    [username]
  );
};

const getUserByEmail = async (email) => {
  return await pool.query(
    "getByEmail",
    "SELECT id, username, email, password, created_on, last_login FROM public.users WHERE email = $2",
    [email]
  );
};

const insertUser = async (user) => {
  const text =
    "INSERT INTO public.users(username, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [user.username, user.email, user.password];
  return await pool.query("insertUser", text, values);
};

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).max(50).required(),
  email: Joi.string().email(),
});
