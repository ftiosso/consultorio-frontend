import { Component } from '@angular/core';
import { Medico } from '../../../models/model.medico';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { EspecialidadesService } from '../../../services/especialidades/especialidades.service';
import { Especialidade } from '../../../models/model.especialidade';

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styleUrl: './medico-edit.component.css'
})

export class MedicoEditComponent {

  Medico:Medico;
  Especialidades:any[]; //Id, Nome, Checked => por causa do Checked temos o tipo any[]. Essa propriedade não é do modelo de dados.

  constructor(private medicosService:MedicosService, 
              private activateRoute:ActivatedRoute, 
              private router:Router, 
              private dialog:MatDialog,
              private especialidadesService: EspecialidadesService){

    const id = this.activateRoute.snapshot.paramMap.get('id');

    this.Medico = new Medico();
    this.Especialidades = [];

    this.getDadosMedico(Number(id));
  }

  getDadosMedico(id: number): void{  
    this.medicosService.getById(id)
    .pipe(take(1))
    .subscribe({
      next: (jsonMedico:Medico)=>{
        this.Medico = jsonMedico;
        this.getEspecialidades();
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    })
  }
  
  getEspecialidades(): void{
    this.especialidadesService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonEspecialidades: Especialidade[]) => {
        this.Especialidades = jsonEspecialidades;
        this.Especialidades.forEach((especialidade:any) => {
          especialidade["Checked"] = this.Medico.Especialidades.some((medicoEspecialidade:Especialidade) => {
            return medicoEspecialidade.Id === especialidade.Id;
          });        
        })        
      },
      error: () => {
        this.exibirMensagemRedirecionar("Erro ao obter especialidades!\nEntre em contato com o suporte.");
      }
    })
  }

  onChangeEspecialidade(event:Event){ 
    const element: HTMLInputElement = <HTMLInputElement> event.target;    
    if (element.checked){
      let especialidade = new Especialidade();
      especialidade.Id = Number(element.id);
      especialidade.Nome = element.value;
      this.Medico.Especialidades.push(especialidade);
    }else{
      this.Medico.Especialidades =  
        this.Medico.Especialidades.filter(especialidade => especialidade.Id !== Number(element.id));
    }
  }

  enviar():void{
    if(this.validarDadosExibirMensagem()){
      this.medicosService.put(this.Medico)
      .pipe(take(1))
      .subscribe({
        next: (jsonMedico:Medico)=>{
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

    if(!this.Medico.Especialidades.length)
      msg += 'Especialidade(s);\n';

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