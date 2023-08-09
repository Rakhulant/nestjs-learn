import { IsNotEmpty } from "class-validator";


export class employeeDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    dept: string
}