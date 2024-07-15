import { Component } from '@angular/core';
import { Paciente } from '../../../models/model.paciente';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-paciente-index',
  templateUrl: './paciente-index.component.html',
  styleUrl: './paciente-index.component.css'
})
export class PacienteIndexComponent {
  
  Pacientes: Paciente[];

  Codigo: number | null;
  Nome: string;

  constructor(private pacientesService:PacientesService, 
              private dialog:MatDialog){
    this.Pacientes = [];
    this.Codigo = null;
    this.Nome = '';
  }

  definirPesquisa(): void{
    this.Pacientes = [];

    if(this.Codigo || this.Codigo === 0){
      this.pesquisarPorCodigo();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    this.pesquisarTodos();
  }
  
  pesquisarTodos(): void{
    this.pacientesService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonPacientes:Paciente[]) => {
        this.Pacientes = jsonPacientes;
        if (this.Pacientes.length === 0)
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorCodigo(): void{
    this.pacientesService.getByCodigo(Number(this.Codigo))
    .pipe(take(1))
    .subscribe({
      next: (jsonPaciente:Paciente)=>{
        this.Pacientes = [jsonPaciente];
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorNome(): void{
    this.pacientesService.getByNome(String(this.Nome))
    .pipe(take(1))
    .subscribe({
      next: (jsonPaciente:Paciente[])=>{
        this.Pacientes = jsonPaciente;
        if (this.Pacientes.length === 0)
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
      this.exibirMensagem(`Nenhum paciente encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }
}