import { Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(item => item.id === id);
  }

  createTask(task: Task): Task {
    this.tasks.push(task);
    return task;

  }

  updateTask(id: string, update: Task): Task {
    const index = this.tasks.findIndex(item => item.id === id);

    if (index === -1) return null;

    const newTask = { ...this.tasks[Number(index)], ...update }

    this.tasks[Number(index)] = newTask;

    return newTask;
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    
    if (!task) return null;

    this.tasks = this.tasks.filter(item => item.id !== id);

    return task;
  }
}
