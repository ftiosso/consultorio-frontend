import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/model.medicamento';
import { take } from 'rxjs';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medicamento-edit',
  templateUrl: './medicamento-edit.component.html',
  styleUrl: './medicamento-edit.component.css'
})
export class MedicamentoEditComponent {

  Medicamento: Medicamento;

  constructor(private activatedRoute:ActivatedRoute,
              private medicamentosService: MedicamentosService,
              private router: Router,
              private dialog: MatDialog){

    this.Medicamento = new Medicamento();

    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.medicamentosService.getById(Number(id))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicamento:Medicamento) => {
        this.Medicamento = jsonMedicamento;
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }   
    });    
  }

  alterar(): void{
    if (this.validarDadosExibirMensagem()){
      this.medicamentosService.put(this.Medicamento)
      .pipe(take(1))
      .subscribe({
        next: (jsonMedicamento:Medicamento) => {
          this.exibirMensagemRedirecionar(`Medicamento ${this.Medicamento.Nome} alterado com sucesso.`);
        },
        error: (jsonErro: HttpErrorResponse) => {
          this.exibirMensagemErro(jsonErro);
  
        }
      });    
    }    
  }
  
  exibirMensagemErro(erro: HttpErrorResponse): void{
    const status:number = erro.status;
    const modelState:any = erro.error?.ModelState;
    const message = modelState !== undefined ? Object.values(modelState).join('\n') : erro.error?.Message || '';

    if (status === 400)
      this.exibirMensagem(`Verifique os dados que estão sendo enviados.\n${message}`);
    else if (status === 404)
      this.exibirMensagemRedirecionar(`Nenhum medicamento encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (!this.Medicamento.Nome) {
      msg += 'Nome;\n';
    }
    
    if (!this.Medicamento.DataFabricacao) {
        msg += 'Data de fabricação;\n';
    }
    
    if (this.Medicamento.DataVencimento
        && this.Medicamento.DataVencimento <= this.Medicamento.DataFabricacao) {
        msg += 'Data de fabricação não pode ser maior ou igual a data de vencimento.';
    }
    
    if (msg) {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.exibirMensagem(msg);
        return false;
    }

    return true;
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent, 
      {data:{mensagem:msg}});

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/medicamentos']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir o medicamento ${this.Medicamento.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.medicamentosService.delete(this.Medicamento.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Medicamento ${this.Medicamento.Nome} excluído com sucesso.`);
          },
          error: (jsonErro: HttpErrorResponse) => {
            this.exibirMensagemErro(jsonErro);
          }            
        }); 
      }
    });
  }
}