import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {limitLogin} from '../../config/limit.js'
import {createToken} from '../../config/createToken.js'
import { loginV1 } from '../../versiones/v1/login.js'
import {loginDto} from '../../DTO/login.js'
const login = Routes();
const version = routesVersioning(); 
login.use(limitLogin(), createToken);
login.post('/', loginDto,version({ "1.0.0": loginV1}));
export {login};