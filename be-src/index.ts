import {
  createPet,
  getAllPets,
  getMyPets,
  getPetsNear,
  deletePet,
  petUpdateData,
  getPetById,
} from "./controllers/pet-controller";
import {
  updateUser,
  getUser,
  getPetsOfUser,
  signUp,
  signIn,
  SECRET,
  checkEmail,
  getId,
} from "./controllers/user-controller";

import * as jwt from "jsonwebtoken";
import * as path from "path";
import * as express from "express";
import { User } from "./models";
import * as cors from "cors";
import { sgMail } from "./lib/sendgrid";

const port = process.env.PORT || 3005;
const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/test", (req, res) => {
  res.json({
    message: "hola soy el servidor",
  });
});

app.post("/send", (req, res) => {
  const msg = req.body;
  sgMail
    .send(msg)
    .then(() => {
      res.json({ message: "Email sent" });
    })
    .catch((error) => {
      res.json(error);
    });
});
//--------------- USERS ENDPOINTS--------------------------------------
app.get("/user", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
//signup
app.post("/auth", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "faltan datos en el body",
    });
  }
  const user = await signUp(req.body);
  res.json(user);
});

//login
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const token = await signIn(email, password);
  const emailCheck = await checkEmail(email);
  if (emailCheck) {
    if (token) {
      res.json(token);
    } else {
      res.status(400).json("email or pass incorrect");
    }
  } else {
    res.status(400).json("usuario no registrado");
  }
});

//middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: true });
  }
}
app.get("/me/:email", async (req, res) => {
  const user = await getId(req.params.email);
  res.json(user);
});

app.post("/me/update", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "faltan datos en el body",
    });
  }
  const updateData = await updateUser(req.body);

  res.json(updateData);
});

//endpoints seguros
app.get("/me", authMiddleware, async (req, res) => {
  const user = await getUser(req._user.id);
  res.json(user);
});

app.get("/me/pets", authMiddleware, async (req, res) => {
  const pets = await getPetsOfUser(req._user.id);
  res.json(pets);
});
//--------------- PETS ENDPOINTS--------------------------------------
// crea un pet y lo asocia al user
app.post("/pets", authMiddleware, async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "faltan datos en el body",
    });
  }
  const pet = await createPet(req._user.id, req.body);
  res.json(pet);
});

app.get("/pets", async (req, res) => {
  const allPets = await getAllPets();
  res.json(allPets);
});

app.get("/pets/cerca-de", async (req, res) => {
  const petsNear = await getPetsNear(req.query);
  res.json(petsNear);
});

app.delete("/pets/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await deletePet(id);
  res.json("mascota eliminada");
});

app.put("/pets/:id", authMiddleware, async (req, res) => {
  const pet = await petUpdateData(req.body, req.params.id);
  res.json(pet);
});

app.get("/pets/me", authMiddleware, async (req, res) => {
  const allPets = await getMyPets(req._user.id);
  res.json(allPets);
});

app.get("/pets/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const pet = await getPetById(id);
  res.json(pet);
});

const staticDirPath = path.resolve(__dirname, "../dist");
app.use(express.static(staticDirPath));
app.get("*", function (req, res) {
  //__dirname, "../fe-dist/index.html" (para que funcione en heroku)

  res.sendFile(staticDirPath + "/index.html");
  // res.sendFile(ruta-heroku)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
