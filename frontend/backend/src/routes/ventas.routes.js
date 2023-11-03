import routesVersioning from 'express-routes-versioning';
import { Router } from "express";
import { limitVentasGET} from '../config/limit.js';
import { ventasV1DTO } from '../DTO/ventas.js';
import { ventasV1} from "../versiones/v1/ventas.js";
const ventasRouter = Router();
const version = routesVersioning();

ventasRouter.get('/',ventasV1DTO, limitVentasGET(), version({
    "1.0.0": ventasV1,
}))

export default ventasRouter;