import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { employee } from './employee.model';
import { EmployeesService } from './services/employees/employees.service';
import { EmployeesController } from './controllers/employees/employees.controller';

@Module({
    imports: [SequelizeModule.forFeature([employee])],
    providers:[{
        provide: 'EMPLOYEE_SERVICE',
        useClass: EmployeesService
    }],
    controllers: [EmployeesController],
    exports: [SequelizeModule]
})
export class EmployeesModule {}
