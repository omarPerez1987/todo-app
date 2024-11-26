import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './sync.controller';
import { TaskService } from './sync.service';

describe('AppController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(taskController.getTasks()).toBe('Hello World!');
    });
  });
});
