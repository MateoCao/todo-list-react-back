import z from 'zod'

const taskSchema = z.object({
  title: z.string({
    invalid_type_error: 'Task title must be a string',
    required_error: 'Task title is required'
  }).min(5),
  description: z.string().min(10).max(100),
  completed: z.boolean(),
  date: z.string().min(10),
  expired: z.boolean()
})

export function validateTask (task) {
  return taskSchema.safeParse(task)
}

export function validatePartialTask (task) {
  return taskSchema.partial().safeParse(task)
}
