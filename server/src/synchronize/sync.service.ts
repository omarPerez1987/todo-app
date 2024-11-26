import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class SyncService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  async pullChanges(lastSyncDate: Date | null) {
    const tasks = await this.prisma.task.findMany();

    const changes = {
      tasks: {
        created: lastSyncDate
          ? tasks.filter(
              (task) =>
                task.createdAt > lastSyncDate && !task.deletedAt && !task.id,
            )
          : [],
        updated: lastSyncDate
          ? tasks.filter(
              (task) => task.updatedAt > lastSyncDate && !task.deletedAt,
            )
          : [],
        deleted: lastSyncDate
          ? tasks
              .filter((task) => task.deletedAt && task.deletedAt > lastSyncDate)
              .map((task) => task.id)
          : [],
      },
    };

    const timestamp = Date.now();
    return { changes, timestamp };
  }

  async pushChanges(changes: any) {
    const { tasks } = changes;

    if (tasks.created) {
      for (const task of tasks.created) {
        await this.taskService.createTask(task);
      }
    }

    if (tasks.updated) {
      for (const task of tasks.updated) {
        await this.taskService.updateTask({ id: task.id, data: task });
      }
    }

    if (tasks.deleted) {
      for (const taskId of tasks.deleted) {
        await this.taskService.deleteTask(taskId);
      }
    }
  }
}
