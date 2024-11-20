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

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(params: {
    id: string;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { id, data } = params;
    return this.prisma.task.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
