import { Component } from '@angular/core';
import { Especialidade } from '../../../models/model.especialidade';
import { EspecialidadesService } from '../../../services/especialidades/especialidades.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-especialidade-index',
  templateUrl: './especialidade-index.component.html',
  styleUrl: './especialidade-index.component.css'
})
export class EspecialidadeIndexComponent {

  Especialidades: Especialidade[];

  Id: number | null;
  Nome: string;

  constructor(private especialidadesService:EspecialidadesService, 
              private dialog:MatDialog){
    this.Especialidades = [];
    this.Id = null;
    this.Nome = '';
  }

  definirPesquisa(): void{
    this.Especialidades = [];

    if(this.Id || this.Id === 0){
      this.pesquisarPorId();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    this.pesquisarTodos();
  }
  
  pesquisarTodos(): void{
    this.especialidadesService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonEspecialidades:Especialidade[]) => {
        this.Especialidades = jsonEspecialidades;
        if (this.Especialidades.length === 0)
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorId(): void{
    this.especialidadesService.getById(Number(this.Id))
    .pipe(take(1))
    .subscribe({
      next: (jsonEspecialidade:Especialidade)=>{
        this.Especialidades = [jsonEspecialidade];
      },
      error: (jsonErro:HttpErrorResponse)=>{
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorNome(): void{
    this.especialidadesService.getByNome(String(this.Nome))
    .pipe(take(1))
    .subscribe({
      next: (jsonEspecialidade:Especialidade[])=>{
        this.Especialidades = jsonEspecialidade;
        if (this.Especialidades.length === 0)
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
      this.exibirMensagem(`Nenhuma especialidade encontrada.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }  
}