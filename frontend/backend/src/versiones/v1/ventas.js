import { validationResult } from "express-validator";
import { connect } from "../../connection/connection.js";
const db = await connect();

export const ventasV1 = async (req, res) => {
  //validar el rate limit
  if (!req.rateLimit) return;
  // validar si paso el dto
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { año, mes } = req.query;
  try {
    const result = await db
      .collection("ventas")
      .aggregate([
        {
          $match: {
            fecha: {
              $gte: new Date(`${año}-${mes}-01`),
              $lt: new Date(`${año}-${mes}-31`),
            },
          },
        },
        {
          $project: {
            _id: 0,
            "nombre-venta": "$ventas_nombre",
          },
        },
      ])
      .toArray();

    if (result.length === 0) {
      res
        .status(404)
        .json({ message: "No hay ventas para el año y mes proporcionados." });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
