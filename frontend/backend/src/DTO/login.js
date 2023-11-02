import {body} from 'express-validator'

export let loginDto = [
    body('email')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .exists().withMessage('La contraseña es obligatoria')
]