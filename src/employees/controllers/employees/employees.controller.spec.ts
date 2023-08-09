import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from 'src/employees/services/employees/employees.service';
import { employeeDto } from '../../employee.dto';
import { Response } from 'express';



describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  let names = ['Raks','Shrad','Om']

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers:[{
        provide: 'EMPLOYEE_SERVICE',
        useValue: {
          findAll: jest.fn((x) => x),
          findOne: jest.fn((x) => ({'name': x, 'dept': 'rimo'})),
          remove: jest.fn((x)=>x)
        }
    }],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>('EMPLOYEE_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getAll', ()=>{

    it('should call findAll',async ()=> {
      const response  = await controller.getAll()
      expect(service.findAll).toHaveBeenCalled()
    });
  })

  describe('get Employee from ID', ()=>{

    it('should call findOne',async ()=> {
      const response  = await controller.getEmployeeFromId('Raks')
      expect(service.findOne).toHaveBeenCalled()
    });
    it('should return properties',async ()=> {
      const response  = await controller.getEmployeeFromId('Raks')
      expect(service.findOne).toHaveBeenCalled()
      expect(response.rows).toHaveProperty('name')
      expect(response.rows).toHaveProperty('dept')
    });
    it('name must be same as parameter',async ()=>{
      let x= 'Raks';
      const response  = await controller.getEmployeeFromId(x);
      expect(response.rows).toEqual({'name': x, 'dept': 'rimo'})
    })
  })

  describe('Remove employee', ()=>{

    let resMock = {
      status: jest.fn(x => x)
    } as unknown as Response
    let empMock = {'name': 'Raks', 'dept': 'rimo'}

    it('Should have status 200',async ()=>{
      const response = await controller.removeEmployee(empMock, resMock);
      expect(resMock.status).toHaveBeenCalledWith(200)
    })

  })

});
