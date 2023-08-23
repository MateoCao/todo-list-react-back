import { TaskModel } from '../modules/task.js'
import { validateTask, validatePartialTask } from '../validationSchema.js'

export class TaskController {
  static async getAll (req, res) {
    const tasks = await TaskModel.getAll()
    res.json(tasks)
  }

  static async getById (req, res) {
    const { _id } = req.params
    const task = await TaskModel.getById({ _id })
    if (task) return res.json(task)
    res.status(404).json({ message: 'Task not found' })
  }

  static async create (req, res) {
    const result = validateTask(req.body)

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newTask = await TaskModel.create({ task: result.data })

    res.status(201).json(newTask)
  }

  static async update (req, res) {
    const result = validatePartialTask(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { _id } = req.params
    const updatedTask = await TaskModel.update({ _id, task: result.data })

    return res.json(updatedTask)
  }

  static async delete (req, res) {
    const data = req.params
    const deletedTask = await TaskModel.delete({ task: data })

    return res.json(deletedTask)
  }
}
