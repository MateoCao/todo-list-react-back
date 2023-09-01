import z from 'zod'

const taskSchema = z.object({
  title: z.string({
    required_error: 'Task title is required'
  }).min(5),
  description: z
    .string({
      required_error: 'Task description is required'
    })
    .min(10)
    .max(100),
  completed: z
    .boolean(),
  date: z
    .string({
      required_error: 'Task date is required'
    })
    .min(10),
  expired: z
    .boolean()
})

export function validateTask (task) {
  return taskSchema.safeParse(task)
}

export function validatePartialTask (task) {
  return taskSchema.partial().safeParse(task)
}
