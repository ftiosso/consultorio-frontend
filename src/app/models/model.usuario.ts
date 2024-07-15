export class Usuario{
    Id!: number;
    Nome: string;
    Email: string;
    Senha: string;
    
    constructor(){
        this.Nome = '';
        this.Email = '';
        this.Senha = '';
    }
}