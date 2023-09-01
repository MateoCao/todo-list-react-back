import { User } from '../models/userSchema.js'

export class AuthModel {
  static async findUserByEmail (email) {
    return User.findOne({ email })
  }

  static async findUserByUsername (username) {
    return User.findOne({ username })
  }

  static async register ({ user, passwordHash }) {
    try {
      const newUser = new User({
        ...user,
        password: passwordHash
      })

      await newUser.save()
      return newUser
    } catch (error) {
      console.error('Error in AuthModel.register:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async login ({ email }) {
    try {
      const userFound = await User.findOne({ email })
      return userFound
    } catch (error) {
      console.error('Error in AuthModel.login:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async profile ({ _id }) {
    try {
      return await User.findOne({ _id })
    } catch (error) {
      console.error('Error in AuthModel.profile:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async verifyToken ({ _id }) {
    try {
      return await User.findOne({ _id })
    } catch (error) {
      console.error('Error in AuthModel.verifyToken:', error)
      throw new Error('Internal Server Error')
    }
  }
}
