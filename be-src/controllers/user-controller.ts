import { User, Pet, Auth } from "../models";
import { cloudinary } from "../lib/cloudinary";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { userInfo } from "os";
const SECRET = process.env.SECRET;

function getSHA256ofString(texto: string) {
  return crypto.createHash("sha256").update(texto).digest("hex");
}
export async function getId(email) {
  const user = await User.findOne({ where: { email: email } });
  return user;
}
export async function updateUser(updateData) {
  const { email, password, userId } = updateData;
  const user = await User.update(
    {
      email: updateData.email,
      fullName: updateData.fullName,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  if (updateData.password) {
    const auth = await Auth.update(
      {
        password: getSHA256ofString(updateData.password),
        email: updateData.email,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  return [user];
}
export async function checkEmail(email) {
  const user = await User.findOne({ where: { email: email } });
  return user;
}
export async function getUser(userId) {
  const profile = await User.findByPk(userId);
  if (profile) {
    return profile;
  } else {
    //prueba para borrar tokens viejos
    localStorage.removeItem("token");
    return true;
  }
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
