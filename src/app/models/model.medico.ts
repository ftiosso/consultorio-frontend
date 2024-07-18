import { Especialidade } from "./model.especialidade";

export class Medico {
    Id!: number;
    CRM: string;
    Nome: string;
    Especialidades: Especialidade[];

    constructor(){
        this.CRM = '';
        this.Nome = '';
        this.Especialidades = [];
    }
}
