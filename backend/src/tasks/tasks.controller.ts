import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { ETaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';

@Controller('/issues')
@ApiTags('Issues')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Get a list of issues.
   * @param filterDto - The filter criteria for issues.
   * @param user - The user making the request.
   * @returns A promise that resolves to an array of issues.
   */
  @Get()
  @ApiResponse({
    type: [Task],
    description: 'A list of all Issues',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter by search',
  })
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }

  /**
   * Create a new issue.
   * @param createTaskDto - The data for creating a issue.
   * @param user - The user making the request.
   * @returns A promise that resolves to the created issue.
   */
  @Post()
  @ApiBody({
    type: CreateTaskDto,
    schema: { title: 'string', description: 'string' },
    description: 'Create a new issue',
  })
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Get a issue by ID.
   * @param id - The ID of the issue.
   * @param user - The user making the request.
   * @returns A promise that resolves to the issue with the specified ID.
   */
  @Get('/:id')
  @ApiResponse({
    type: Task,
    description: 'Get a issue by ID',
  })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Delete a issue by ID.
   * @param id - The ID of the issue to delete.
   * @param user - The user making the request.
   * @returns A promise that resolves when the issue is deleted.
   */
  @Delete('/:id/delete')
  @ApiResponse({
    type: undefined,
  })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  /**
   * Update the status of a issue.
   * @param id - The ID of the issue to update.
   * @param status - The new status for the issue.
   * @param user - The user making the request.
   * @returns A promise that resolves to the updated issue.
   */
  @Patch('/:id/status')
  @ApiBody({
    type: UpdateTaskStatusDto,
    description: 'Update a issue status',
  })
  @ApiResponse({
    type: Task,
    description: 'Update a issue status',
  })
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: ETaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
