import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as ur from "../data/users.js";
import config from "../config.js";

export async function signup(req, res, next) {
  const { username, password, email } = req.body;
  const hashed = await bcrypt.hash(password, parseInt(config.jwt.salt));
  await ur.create(username, hashed, email);

  const privkey = config.jwt.priv;
  const token = jwt.sign(
    {
      username,
    },
    privkey
  );
  res.json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const userData = await ur.getUser(username);
  if (userData) {
    const result = await bcrypt.compare(password, userData.password);
    const privkey = config.jwt.priv;
    if (result) {
      const token = jwt.sign(
        {
          username,
        },
        privkey
      );
      res.json({
        token,
        username,
      });
    }
  } else {
    res.status(204).send("User not found");
  }
}

export async function me(req, res, next) {
  const authHeader = req.header("Authorization").split(" ")[1];
  const privkey = config.jwt.priv;
  const result = jwt.verify(authHeader, privkey);
  if (result) {
    res.json({
      token: authHeader,
      username: result.username,
    });
  }
}
