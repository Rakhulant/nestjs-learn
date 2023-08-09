import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { employee } from './employees/employee.model';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5438,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    models: [employee],
    define: {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  }), EmployeesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
