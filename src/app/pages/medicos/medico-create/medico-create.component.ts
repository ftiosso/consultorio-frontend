import { Component } from '@angular/core';
import { Medico } from '../../../models/model.medico';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrl: './medico-create.component.css'
})
export class MedicoCreateComponent {

  Medico:Medico;

  constructor(private medicosService:MedicosService, 
              private router:Router, 
              private dialog:MatDialog){
    this.Medico = new Medico();
  }

  enviar(): void{
      if(this.validarDadosExibirMensagem()){
        this.medicosService.post(this.Medico)
        .pipe(take(1))
        .subscribe({
          next: (jsonMedico:Medico)=>{
            this.Medico = jsonMedico;
            this.exibirMensagemRedirecionar(`Medico ${this.Medico.Nome} cadastrado com sucesso.`);
          },
          error: (jsonErro: HttpErrorResponse) => {
            this.exibirMensagemErro(jsonErro);
          }
        });
      }
  }

  validarDadosExibirMensagem(): boolean{

    let msg: string = '';
    
    if(!this.Medico.CRM)
      msg += 'CRM;\n';

    if(!this.Medico.Nome)
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
      this.exibirMensagemRedirecionar(`Nenhum médico encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/medicos']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }  
}