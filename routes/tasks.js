import { Router } from 'express'
import { TaskController } from '../controllers/tasks.js'
import { authRequired } from '../middlewares/validateToken.js'

export const tasksRouter = Router()

tasksRouter.get('/', authRequired, TaskController.getAll)
tasksRouter.post('/', authRequired, TaskController.create)

tasksRouter.get('/:_id', authRequired, TaskController.getById)
tasksRouter.patch('/:_id', authRequired, TaskController.update)
tasksRouter.delete('/:_id', authRequired, TaskController.delete)
