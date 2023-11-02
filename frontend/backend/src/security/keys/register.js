import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {limitRegister} from '../../config/limit.js'
import { registerV1 } from '../../versiones/v1/register.js'
import {registerDto} from '../../DTO/register.js'
const register = Routes();
const version = routesVersioning(); 
register.post('/',limitRegister(),registerDto,version({ "1.0.0": registerV1}));
export {register};