import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../models/model.usuario';
import { take } from 'rxjs';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.css'
})
export class UsuarioCreateComponent {

  Usuario: Usuario;
  ConfirmacaoSenha: string;

  constructor(private usuariosService:UsuariosService,
              private router: Router,
              private dialog:MatDialog){
    this.Usuario = new Usuario();
    this.ConfirmacaoSenha = '';
  }

  enviar(): void{
    
    if (this.validarDadosExibirMensagem()){

      this.usuariosService.post(this.Usuario)
      .pipe(take(1))
      .subscribe({
        next: (jsonUsuario:Usuario) => {
          this.exibirMensagemRedirecionar(`Usuário ${this.Usuario.Nome} cadastrado com sucesso.`);
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

    if (!this.Usuario.Senha) {
      msg += 'Senha;\n';
    }

    if (this.Usuario.Senha !== this.ConfirmacaoSenha){
      msg += 'Senhas não coincidem;\n';
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

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/usuarios']);
    });
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }
}
