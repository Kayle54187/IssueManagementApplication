import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETaskStatus } from './tasks-status.enum';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a task entity in the task management application.
 */
@Entity()
export class Task extends BaseEntity {
  /**
   * The unique identifier of the task.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * The title of the task.
   */
  @Column()
  @ApiProperty()
  title: string;

  /**
   * The description of the task.
   */
  @Column()
  @ApiProperty()
  description: string;

  /**
   * The status of the task.
   */
  @Column()
  @ApiProperty()
  status: ETaskStatus;
}
