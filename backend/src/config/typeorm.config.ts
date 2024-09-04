import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import * as dbConfig from 'config';

const config = dbConfig.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: config.type,
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: [Task],
  synchronize: true,
};
