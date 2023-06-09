import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';

interface createUserProperty {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, createUserProperty> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
