import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(item => item.id === id);

    if (!task) {
      throw new NotFoundException('Задача не найдена')
    }

    return task;
  }

  createTask(task: Task): Task {
    this.tasks.push({ ...task, id: String(crypto.randomUUID()) });

    return task;
  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex(item => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Не найдена задача с указанным id');
    };

    const newTask = { ...this.tasks[Number(index)], ...update };

    this.tasks[Number(index)] = newTask;

    return newTask;
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException('Не найдена задача с указанным id');
    };

    this.tasks = this.tasks.filter(item => item.id !== id);

    return task;
  }
}
