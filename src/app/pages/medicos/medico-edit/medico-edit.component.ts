import { Component } from '@angular/core';
import { Medico } from '../../../models/model.medico';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styleUrl: './medico-edit.component.css'
})
export class MedicoEditComponent {

  Medico:Medico;

  constructor(private medicosService:MedicosService, 
              private activateRoute:ActivatedRoute, 
              private router:Router, 
              private dialog:MatDialog
  ){
    this.Medico = new Medico();
    
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.medicosService.getById(Number(id))
    .pipe(take(1))
    .subscribe({
      next: (medico:Medico)=>{
        this.Medico = medico;
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }   
    })
  }

  enviar():void{
    if(this.validarDadosExibirMensagem()){
      this.medicosService.put(this.Medico)
      .pipe(take(1))
      .subscribe({
        next: (medico:Medico)=>{
          this.exibirMensagemRedirecionar(`Médico ${this.Medico.Nome} alterado com sucesso.`);
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

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/medicos']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir o médico ${this.Medico.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.medicosService.delete(this.Medico.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Médico ${this.Medico.Nome} excluído com sucesso.`);
          },
          error: (jsonErro: HttpErrorResponse) => {
            this.exibirMensagemErro(jsonErro);
          }            
        }); 
      }
    });
  }
}