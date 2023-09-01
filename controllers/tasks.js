import { TaskModel } from '../modules/task.js'
import { validateTask, validatePartialTask } from '../validations/taskValidationSchema.js'

export class TaskController {
  static async getAll (req, res) {
    try {
      const id = req.user.id ? req.user.id : req.user.payload
      const tasks = await TaskModel.getAll({ userId: id })
      res.json(tasks)
    } catch (error) {
      console.error('Error in getAll:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async getById (req, res) {
    try {
      const { _id } = req.params
      const task = await TaskModel.getById({ _id })
      if (task) {
        res.json(task)
      } else {
        res.status(404).json({ message: 'Task not found' })
      }
    } catch (error) {
      console.error('Error in getById:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async create (req, res) {
    try {
      const result = validateTask(req.body)
      const id = req.user.id ? req.user.id : req.user.payload

      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newTask = await TaskModel.create({ task: result.data, user: id })
      console.log(newTask)

      res.status(201).json(newTask)
    } catch (error) {
      console.error('Error in create:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async update (req, res) {
    try {
      const result = validatePartialTask(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const { _id } = req.params
      const updatedTask = await TaskModel.update({ _id, task: result.data })

      res.json(updatedTask)
    } catch (error) {
      console.error('Error in update:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async delete (req, res) {
    try {
      const data = req.params
      const deletedTask = await TaskModel.delete({ task: data })

      if (!deletedTask) return res.status(404).json({ error: 'Tarea no encontrada' })

      return res.sendStatus(204)
    } catch (error) {
      console.error('Error in delete:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
