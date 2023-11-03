import { router as Ventas } from "../src/middlewares/ventas.js";

export default async function dynamicRouter(req, res, next) {
  const { collection } = req.params;
  switch (collection) {
    case "ventas":
      return Ventas(req, res, next);
    default:
      return res.status(404).send({ error: "Ruta no encontrada" });
  }
}
