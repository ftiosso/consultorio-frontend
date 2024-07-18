import { Component } from '@angular/core';
import { Especialidade } from '../../../models/model.especialidade';
import { EspecialidadesService } from '../../../services/especialidades/especialidades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-especialidade-edit',
  templateUrl: './especialidade-edit.component.html',
  styleUrl: './especialidade-edit.component.css'
})
export class EspecialidadeEditComponent {

  Especialidade:Especialidade;

  constructor(private especialidadesService:EspecialidadesService, 
              private activateRoute:ActivatedRoute, 
              private router:Router, 
              private dialog:MatDialog){

    this.Especialidade = new Especialidade();
    
    const id = this.activateRoute.snapshot.paramMap.get('id');

    this.especialidadesService.getById(Number(id))
    .pipe(take(1))
    .subscribe({
      next: (jsonEspecialidade:Especialidade)=>{
        this.Especialidade = jsonEspecialidade;
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }   
    })
  }

  enviar():void{
    if(this.validarDadosExibirMensagem()){
      this.especialidadesService.put(this.Especialidade)
      .pipe(take(1))
      .subscribe({
        next: (jsonEspecialidade:Especialidade)=>{
          this.exibirMensagemRedirecionar(`Especialidade ${this.Especialidade.Nome} alterada com sucesso.`);
        },
        error: (jsonErro: HttpErrorResponse) => {
          this.exibirMensagemErro(jsonErro);
        }   
      });
    }  
  }

  validarDadosExibirMensagem(): boolean{
    let msg: string = '';

    if(!this.Especialidade.Nome)
      msg += 'Nome;\n';

    if(msg){
      msg = 'Verifique os seguintes dados:\n'+msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;

  }

  exibirMensagemErro(erro: HttpErrorResponse): void{
    const status:number = erro.status;
    const modelState:any = erro.error?.ModelState;
    const message = modelState !== undefined ? Object.values(modelState).join('\n') : erro.error?.Message || '';

    if (status === 400)
      this.exibirMensagem(`Verifique os dados que estão sendo enviados.\n${message}`);
    else if (status === 404)
      this.exibirMensagemRedirecionar(`Nenhuma especialidade encontrada.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/especialidades']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir a especialidade ${this.Especialidade.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.especialidadesService.delete(this.Especialidade.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Especialidade ${this.Especialidade.Nome} excluída com sucesso.`);
          },
          error: (jsonErro: HttpErrorResponse) => {
            this.exibirMensagemErro(jsonErro);
          }            
        }); 
      }
    });
  }
}