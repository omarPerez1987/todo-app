import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import {
  CreateTaskDto,
  createTaskSchema,
  idSchema,
  UpdateTaskDto,
  updateTaskSchema,
} from './task.validation';
import { ZodValidationPipe } from 'src/pipes/validation.pipes';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskService.getTasks();
    return tasks;
  }

  @Get(':id')
  async getTask(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<Task | null> {
    const task = await this.taskService.getTask(id);
    return task;
  }

  @Post()
  async createTask(
    @Body(new ZodValidationPipe(createTaskSchema))
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const newTask = await this.taskService.createTask(createTaskDto);
    return newTask;
  }

  @Patch(':id')
  async updateTask(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
    @Body(new ZodValidationPipe(updateTaskSchema)) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const updateTask = await this.taskService.updateTask({
      id,
      data: updateTaskDto,
    });
    return updateTask;
  }

  @Delete(':id')
  deleteTask(
    @Param('id', new ZodValidationPipe(idSchema)) id: string,
  ): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
