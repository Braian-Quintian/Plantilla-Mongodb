import { query } from "express-validator";

export const ventasV1DTO = [
  query("año")
    .exists()
    .withMessage("El año es obligatorio")
    .isNumeric()
    .withMessage("El año debe ser un número"),
  query("mes")
    .exists()
    .withMessage("El año es obligatorio")
    .isNumeric()
    .withMessage("El mes debe ser un número"),
  query("dia").optional().isNumeric().withMessage("El día debe ser un número"),
];
