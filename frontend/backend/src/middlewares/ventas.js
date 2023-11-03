import Routes from 'express';
import passportHelper from '../config/passportHelpert.js'
import ventas from '../routes/ventas.routes.js'
const router = Routes();

router.use(passportHelper.authenticate('bearer', { session:false}))
router.use('/', ventas)

export {router}