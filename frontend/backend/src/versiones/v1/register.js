import { validationResult } from "express-validator";
import { connect } from "../../connection/connection.js";
import bcrypt from "bcrypt";
const db = await connect();

export const registerV1 = async (req, res) => {
  if (!req.rateLimit) return;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "Datos no enviados" });
    }
    const acceptVersion = req.headers["accept-version"];
    if (!acceptVersion) {
      return res
        .status(422)
        .send({ message: "No se define la versión del API" });
    }
    let collectionEntry;
    switch (acceptVersion) {
      case "1.0.0":
        collectionEntry = "clientes";
        break;
      default:
        return res.status(422).send({ message: "Versión del API incorrecta" });
    }

    const result = await db
      .collection(collectionEntry)
      .findOne({
        [`${collectionEntry.substring(0, 3)}_email`]: req.body.correo,
      });
    if (result) {
      return res.status(403).send({ message: "Usuario ya registrado" });
    } else {
      if (req.baseUrl === "/register") {
        await db.collection(collectionEntry).insertOne({
          [`${collectionEntry.substring(0, 3)}_email`]: req.body.correo,
          [`${collectionEntry.substring(0, 3)}_password`]: await bcrypt.hash(
            req.body.contraseña,
            10
          ),
        });
        res.status(201).send({ message: "Usuario registrado correctamente" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Acceso no autorizado" });
  }
};