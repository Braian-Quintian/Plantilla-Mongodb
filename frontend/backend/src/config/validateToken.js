import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";
import conexion from "../connection/credentials.js";
import { connect } from "../connection/connection.js";
const db = await connect();

export const validarToken = async (req, token) => {
  try {
    // Payload al token
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(token, encoder.encode(conexion.token));

    // Buscar al usuario en la colección de clientes
    const collection = db.collection("clientes");
    const query = { _id: new ObjectId(jwtData.payload.id) };
    const userPermissions = await collection.findOne(query);
    if (!userPermissions) throw new Error("El usuario no se encuentra en la colección");

    return true; // Devolver true si el usuario es válido
  } catch (error) {
    return false; // Devolver false en caso de error
  }
};