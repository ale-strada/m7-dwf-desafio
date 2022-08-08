import { User, Pet, Auth } from "../models";
import { cloudinary } from "../lib/cloudinary";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
const SECRET = "frasesecreta1234";

export async function updateUser(userId, updateData) {
  await User.update(updateData, {
    where: {
      id: userId,
    },
  });
  return updateData;
}
export async function checkEmail(email) {
  const user = await User.findOne({ where: { email: email } });
  return user;
}
export async function getUser(userId) {
  const profile = await User.findByPk(userId);
  return profile;
}

function getSHA256ofString(texto: string) {
  return crypto.createHash("sha256").update(texto).digest("hex");
}

//signup
export async function signUp(userData) {
  const { email, fullName, password } = userData;
  const [user, created] = await User.findOrCreate({
    where: { email: userData.email },
    defaults: {
      email,
      fullName,
    },
  });
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email: userData.email,
      password: getSHA256ofString(userData.password),
      user_id: user.get("id"),
    },
  });
  return [user, auth];
}

//signin
export async function signIn(email, password) {
  const passwordHasheado = getSHA256ofString(password);
  const auth = await Auth.findOne({
    where: {
      email,
      password: passwordHasheado,
    },
  });
  if (auth) {
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
    return token;
  } else {
    return false;
  }
}

export async function getPetsOfUser(userId) {
  const pets = await Pet.findAll({
    where: {
      userId,
    },
    include: [User],
  });
  return pets;
}

export { SECRET };
