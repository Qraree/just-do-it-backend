import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  async create(createTaskDto: CreateTaskDto) {
    return await this.taskModel.create(createTaskDto);
  }

  async findAll() {
    return await this.taskModel.findAll();
  }

  async findOneById(id: number) {
    return await this.taskModel.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    return await this.taskModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
