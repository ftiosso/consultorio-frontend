import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent {

  Usuario: Usuario;

  constructor(private activatedRoute:ActivatedRoute,
              private usuariosService: UsuariosService,
              private router: Router,
              private dialog: MatDialog){

    this.Usuario = new Usuario();

    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.usuariosService.getById(Number(id))
    .pipe(take(1))
    .subscribe({
      next: (jsonUsuario:Usuario) => {
        this.Usuario = jsonUsuario;
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }   
    });    
  }

  alterar(): void{
    if (this.validarDadosExibirMensagem()){
      this.usuariosService.put(this.Usuario)
      .pipe(take(1))
      .subscribe({
        next: (jsonUsuario:Usuario) => {
          this.exibirMensagemRedirecionar(`Usuário ${this.Usuario.Nome} alterado com sucesso.`);
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
      this.exibirMensagemRedirecionar(`Nenhum usuário encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (!this.Usuario.Nome) {
      msg += 'Nome;\n';
    }
    
    if (!this.Usuario.Email) {
      msg += 'E-mail;\n';
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
      this.router.navigate(['/usuarios']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent, 
      {data:{mensagem:`Deseja excluir o usuário ${this.Usuario.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.usuariosService.delete(this.Usuario.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Usuário ${this.Usuario.Nome} excluído com sucesso.`);
          },
          error: (jsonErro: HttpErrorResponse) => {
            this.exibirMensagemErro(jsonErro);
          }            
        }); 
      }
    });
  }

}
