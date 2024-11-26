import { z } from 'zod';

const taskSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCompleted: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deleteAt: z.date().optional().nullable(),
});

export const paramsSchema = z.string().nullable();

export const pushChangeSchema = z.object({
  tasks: z.object({
    created: z.array(taskSchema),
    updated: z.array(taskSchema),
    deleted: z.array(z.string()),
  }),
});

export type ParamSyncDto = z.infer<typeof paramsSchema>;
export type PushSyncDto = z.infer<typeof pushChangeSchema>;
