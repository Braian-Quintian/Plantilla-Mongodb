import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import conexion from "../connection/credentials.js";
import { connect } from "../connection/connection.js";
const db = await connect();

export const createToken = async (req, res, next) => {
  try {
    //validar que los datos no esten vacios
    if (Object.keys(req.body).length === 0) return res.status(400).send({ message: "Datos no enviados" });

    // Validar que se envíe la versión del api
    const acceptVersion = req.headers["accept-version"];
    if (!acceptVersion)return res.status(422).send({ message: "No se define la version del api" });

    // Determinar la colección a la que pertenece en función de la versión
    let collectionEntry;
    switch (acceptVersion) {
      case "1.0.0":
        collectionEntry = "clientes";
        break;
      default:
        return res.status(422).send({ message: "Version del api incorrecta" });
    }

    // Buscar el usuario en la colección correspondiente
    const result = await db.collection(collectionEntry).findOne({[`${collectionEntry.substring(0, 3)}_email`]: req.body.correo,});
    if (!result) return res.status(403).send({ message: "Usuario no encontrado" });
    const storedPassword = result[`${collectionEntry.substring(0, 3)}_password`];
    const providedPassword = req.body.contraseña;
    const passwordMatch = await bcrypt.compare(providedPassword,storedPassword);
    if (!passwordMatch) return res.status(401).send({ message: "Contraseña incorrecta" });

    // Generar el token JWT
    const encoder = new TextEncoder();
    const id = result._id.toString();
    const jwtConstructor = await new SignJWT({ id: id })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("3h")
      .sign(encoder.encode(conexion.token));
    req.data = { status: 200, message: jwtConstructor };
    next();
  } catch (error) {
    return res.status(401).send({ message: "Acceso no autorizado" });
  }
};