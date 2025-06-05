import { Controller, Get, Query } from "@nestjs/common";
import { SortColumns, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("sortBy") sortBy?: SortColumns,
  ) {
    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
