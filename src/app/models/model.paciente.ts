export class Paciente{
    Codigo!: number;
    Nome: string;
    DataNascimento: Date;

    constructor(){
        this.Nome = '';
        this.DataNascimento = new Date();
    }
}