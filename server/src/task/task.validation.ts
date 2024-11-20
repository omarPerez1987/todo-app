import { z } from 'zod';

export const idSchema = z
  .object({
    id: z.string().cuid(),
  })
  .required();

export const createTaskSchema = z
  .object({
    id: z.string().cuid().optional(),
    content: z.string(),
    isCompleted: z.boolean().optional(),
  })
  .required();

export const updateTaskSchema = z.object({
  id: z.string().cuid().optional(),
  content: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export type IdTaskDto = z.infer<typeof idSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
