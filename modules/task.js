import { Task } from '../taskSchema.js'

export class TaskModel {
  static async getAll () {
    return Task.find()
  }

  static async getById ({ _id }) {
    const task = await Task.findById(_id)
    return task
  }

  static async create ({ task }) {
    const newTask = new Task({
      ...task
    })

    await newTask.save()
    return newTask
  }

  static async update ({ _id, task }) {
    const updatedTask = await Task.findByIdAndUpdate(_id, task, {
      new: true
    })

    return updatedTask
  }

  static async delete ({ task }) {
    const deletedTask = await Task.findByIdAndDelete(task._id, task)

    return deletedTask
  }
}
