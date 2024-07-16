import { Component } from '@angular/core';
import { Especialidade } from '../../../models/model.especialidade';
import { EspecialidadesService } from '../../../services/especialidades/especialidades.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-especialidade-create',
  templateUrl: './especialidade-create.component.html',
  styleUrl: './especialidade-create.component.css'
})
export class EspecialidadeCreateComponent {

  Especialidade:Especialidade;

  constructor(private especialidadesService:EspecialidadesService, 
              private router:Router, 
              private dialog:MatDialog){
    this.Especialidade = new Especialidade();
  }

  enviar(): void{
      if(this.validarDadosExibirMensagem()){
        this.especialidadesService.post(this.Especialidade)
        .pipe(take(1))
        .subscribe({
          next: (jsonEspecialidade:Especialidade)=>{
            this.Especialidade = jsonEspecialidade;
            this.exibirMensagemRedirecionar(`Especialidade ${this.Especialidade.Nome} cadastrada com sucesso.`);
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

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/especialidades']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }  
}