import { Task } from '../models/taskSchema.js'

export class TaskModel {
  static async getAll ({ userId }) {
    try {
      return Task.find({
        user: userId
      }).populate('user')
    } catch (error) {
      console.error('Error in TaskModel.getAll:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async getById ({ _id }) {
    try {
      const task = await Task.findById(_id).populate('user')
      return task
    } catch (error) {
      console.error('Error in TaskModel.getById:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async create ({ task, user }) {
    try {
      const newTask = new Task({
        ...task,
        user
      })

      await newTask.save()
      return newTask
    } catch (error) {
      console.error('Error in TaskModel.create:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async update ({ _id, task }) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(_id, task, {
        new: true
      })

      return updatedTask
    } catch (error) {
      console.error('Error in TaskModel.update:', error)
      throw new Error('Internal Server Error')
    }
  }

  static async delete ({ task }) {
    try {
      const deletedTask = await Task.findByIdAndDelete(task._id, task)

      return deletedTask
    } catch (error) {
      console.error('Error in TaskModel.delete:', error)
      throw new Error('Internal Server Error')
    }
  }
}
