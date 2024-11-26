import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTask(id: string): Promise<Task | null> {
    const task = this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) throw new Error('No existe está tarea');
    return task;
  }

  async createTask(task: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data: {
        id: task.id,
        content: task.content,
        isCompleted: task.isCompleted,
        createdAt: task.createdAt || new Date(),
        updatedAt: task.updatedAt || new Date(),
        deletedAt: task.deletedAt || null,
      },
    });
  }

  async updateTask(params: {
    id: string;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, id } = params;
    return this.prisma.task.update({
      where: { id },
      data: {
        content: data.content,
        isCompleted: data.isCompleted,
        updatedAt: new Date(),
        deletedAt: data.deletedAt || null,
      },
    });
  }

  async deleteTask(id: string): Promise<void> {
    if (!id) return;

    await this.prisma.task.updateMany({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
