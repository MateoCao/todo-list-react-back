import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/userValidator.js'
import { registerSchema, loginSchema } from '../validations/userValidationSchema.js'

export const authRouter = Router()

authRouter.post('/register', validateSchema(registerSchema), AuthController.register)
authRouter.post('/login', validateSchema(loginSchema), AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/profile', authRequired, AuthController.profile)
authRouter.get('/verify-token', AuthController.verifyToken)
