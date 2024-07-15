import { Component } from '@angular/core';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/model.medicamento';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medicamento-index',
  templateUrl: './medicamento-index.component.html',
  styleUrl: './medicamento-index.component.css'
})
export class MedicamentoIndexComponent {

  Medicamentos: Medicamento[];

  Id: number | null;
  Nome: string;

  constructor(private medicamentosService:MedicamentosService,
              private dialog:MatDialog){
    this.Medicamentos = [];
    this.Id = null;
    this.Nome = '';
  }

  definirPesquisa(): void{

    this.Medicamentos = [];

    if (this.Id || this.Id === 0) {
      this.pesquisarPorId();
      return;
    }

    if (this.Nome) {
      this.pesquisarPorNome();
      return;
    }

    this.pesquisar();
  }

  pesquisar(): void{
    
    this.medicamentosService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicamentos:Medicamento[]) => {
        this.Medicamentos = jsonMedicamentos;
        if (this.Medicamentos.length === 0) 
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorId() :void{
    this.medicamentosService.getById(Number(this.Id))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicamento:Medicamento) => {
        this.Medicamentos = [jsonMedicamento];
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorNome(): void{
    
    this.medicamentosService.getByNome(this.Nome)
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicamentos:Medicamento[]) => {
        this.Medicamentos = jsonMedicamentos;
        if (this.Medicamentos.length === 0) 
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  exibirMensagemErro(erro: HttpErrorResponse): void{
    const status:number = erro.status;
    const modelState:any = erro.error?.ModelState;
    const message = modelState !== undefined ? Object.values(modelState).join('\n') : erro.error?.Message || '';

    if (status === 404)
      this.exibirMensagem(`Nenhum medicamento encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }
  
  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }
}