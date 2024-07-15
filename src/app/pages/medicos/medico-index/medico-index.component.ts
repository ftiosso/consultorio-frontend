import { Component } from '@angular/core';
import { Medico } from '../../../models/model.medico';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-medico-index',
  templateUrl: './medico-index.component.html',
  styleUrl: './medico-index.component.css'
})
export class MedicoIndexComponent {

  Medicos: Medico[];

  Id: number | null;
  Nome: string;
  CRM: string;

  constructor(private medicosService:MedicosService, 
              private dialog:MatDialog){
    this.Medicos = [];
    this.Id = null;
    this.Nome = '';
    this.CRM = '';
  }

  definirPesquisa(): void{
    this.Medicos = [];

    if(this.Id || this.Id === 0){
      this.pesquisarPorId();
      return;
    }

    if(this.CRM){
      this.pesquisarPorCRM();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    this.pesquisarTodos();
  }
  
  pesquisarTodos(): void{
    this.medicosService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicos:Medico[]) => {
        this.Medicos = jsonMedicos;
        if (this.Medicos.length === 0)
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorId(): void{
    this.medicosService.getById(Number(this.Id))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedico:Medico)=>{
        this.Medicos = [jsonMedico];
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorCRM(): void{
    this.medicosService.getByCRM(String(this.CRM))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedico:Medico)=>{
        this.Medicos = [jsonMedico];
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    })
  }

  pesquisarPorNome(): void{
    this.medicosService.getByNome(String(this.Nome))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedico:Medico[])=>{
        this.Medicos = jsonMedico;
        if (this.Medicos.length === 0)
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    })
  }
 
  exibirMensagemErro(erro: HttpErrorResponse): void{
    const status:number = erro.status;
    const modelState:any = erro.error?.ModelState;
    const message = modelState !== undefined ? Object.values(modelState).join('\n') : erro.error?.Message || '';

    if (status === 404)
      this.exibirMensagem(`Nenhum médico encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }
}