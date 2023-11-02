import {body} from 'express-validator'

export let registerDto = [
    body('correo')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('contraseña')
        .exists().withMessage('La contraseña es obligatoria')
]