import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { employee } from '../../employee.model';
import { getModelToken } from '@nestjs/sequelize';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let empmodel: typeof employee;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,{
        provide: getModelToken(employee),
        useValue: {
          findOne: jest.fn((x)=>(x)),
          findAll: jest.fn((x)=>(x)),
          destroy: jest.fn(()=>{}),
          findOrCreate: jest.fn()
        }
      }],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
    empmodel = module.get<typeof employee>(getModelToken(employee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('model should be defined', () => {
    expect(empmodel).toBeDefined();
  });


  describe('findOne', ()=> {

    it('should call findOne with same params',async ()=>{
        const response = await service.findOne('Raks');
        expect(empmodel.findOne).toHaveBeenCalledWith({where:{name:'Raks'}})
    })  
    
    
  })

  describe('findAll', ()=> {

    it('should call findAll ',async ()=>{
        const response = await service.findAll();
        expect(empmodel.findAll).toHaveBeenCalled()
    })  
  })

  describe('remove', ()=> {
    it('should call ',async ()=>{
      const response = await service.add({name:'Raks', dept:'rimo'});
      expect(empmodel.findOrCreate).toHaveBeenCalled();
  })   
  })


});
