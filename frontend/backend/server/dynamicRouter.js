import { router as Register } from "../src/middlewares/register.js";

export default async function dynamicRouter(req, res, next) {
  const { collection } = req.params;
  switch (collection) {
    case "register":
      return Register(req, res, next);
    default:
      return res.status(404).send({ error: "Ruta no encontrada" });
  }
}
