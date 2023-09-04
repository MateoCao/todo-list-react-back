import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  console.log('VALIDATE TOKEN:', token)

  if (!token) return res.status(401).json({ message: 'No token, autorización denegada' })

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' })
    console.log('VALIDATE TOKEN, jwt VERIFY:', token, user)

    req.user = user
    next()
  })
}
