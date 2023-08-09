import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { employeeDto } from '../../employee.dto';
import { employee } from '../../employee.model';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(employee) private empModel: typeof employee){}


    async findAll() {
        return this.empModel.findAll();
      }
    
      findOne(name: string): Promise<employee> {
        return this.empModel.findOne({
          where: {
            name,
          },
        });
      }
    
      async remove(name: string): Promise<void> {
        const emp = await this.findOne(name);
        await emp.destroy();
      }


      async add(emp: employeeDto) : Promise<void>{
        await this.empModel.findOrCreate({where: {"name": emp.name, "dept": emp.dept}});
      }

      
}
