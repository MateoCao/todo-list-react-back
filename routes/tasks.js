import { Router } from 'express'
import { TaskController } from '../controllers/tasks.js'

export const tasksRouter = Router()

tasksRouter.get('/', TaskController.getAll)
tasksRouter.post('/', TaskController.create)

tasksRouter.get('/:_id', TaskController.getById)
tasksRouter.patch('/:_id', TaskController.update)
tasksRouter.delete('/:_id', TaskController.delete)
