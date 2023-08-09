import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import { employeeDto } from '../../employee.dto'
import { EmployeesService } from '../../services/employees/employees.service';
import { Response } from 'express';

@Controller('employees')
export class EmployeesController {

    constructor(@Inject('EMPLOYEE_SERVICE') private readonly empService:EmployeesService){}

    @Get()
    async getAll(){
        const rows = await this.empService.findAll();
        return {rows}
    }

    @Get(':name')
    async getEmployeeFromId(@Param('name') name: string){
        const rows = await this.empService.findOne(name);
        return {rows}
    }


    @Delete()
    async removeEmployee(@Body() emp: employeeDto, @Res() res:Response){
        await this.empService.remove(emp.name);
        res.status(200)
    }

    @Post('add')
    async addEmployee(@Body() emp: employeeDto){
        await this.empService.add(emp);
        return "Success"
    }



}
