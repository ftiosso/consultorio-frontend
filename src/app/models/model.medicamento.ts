export class Medicamento{

    Id!: number;
    Nome: string;
    DataFabricacao: Date;
    DataVencimento!: Date | null;

    public constructor(){        
        this.Nome = '';
        this.DataFabricacao = new Date();
    }
}