import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { SortColumns, Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: SortColumns
  ): Task[] {
    let values = this.tasks;

    if (status) {
      if (Object.values(TaskStatus).includes(status)) {
        values = values.filter(item => item.status === status)
      } else {
        throw new BadRequestException(`Можно фильтровать по статусам ${Object.values(TaskStatus)}`);
      }
    }

    if (sortBy) {
      if (Object.values(SortColumns).includes(sortBy)) {
        values = values.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
      } else {
        throw new BadRequestException('можно сортировать по title и status');
      }
    }

    if (page && limit) {
      const pageNum = Number(page);
      const limitNum = Number(limit);

      if (pageNum >= 1 && limitNum >= 1) {
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;

        values = values.slice(startIndex, endIndex);
      } else {
        throw new BadRequestException('page limit должны быть положительными числами');
      }
    }

    if (!values) {
      throw new NotFoundException('Ошибка при получении задач')
    }

    return values;
  }
}
