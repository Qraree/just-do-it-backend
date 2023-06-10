import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [SequelizeModule.forFeature([User, Task])],
})
export class TasksModule {}
