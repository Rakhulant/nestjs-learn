
import { Column, Model, Table } from "sequelize-typescript";


@Table
export class employee extends Model{

    @Column
    name: string;

    @Column
    dept: string;
}