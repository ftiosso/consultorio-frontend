import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacoes/autenticacao.service';
import { Login } from '../../models/model.login';
import { take } from 'rxjs';
import { Usuario } from '../../models/model.usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  Login: Login;
  Erro: string;
  private Usuario:Usuario;

  constructor(private router:Router, 
              private autenticacaoService:AutenticacaoService){
    this.Login = new Login();
    this.Usuario = new Usuario;
    this.Erro = '';
  }

  submit() {
    
    this.autenticacaoService.autenticar(this.Login)
    .pipe(take(1))
    .subscribe({
      next: (jsonUsuario:Usuario) => {
        this.Usuario = jsonUsuario;
        this.Erro = '';
        this.router.navigate(['/home']);
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }   
    });
  }   

  exibirMensagemErro(erro: HttpErrorResponse): void{
    const status:number = erro.status;
    const modelState:any = erro.error?.ModelState;
    const message = modelState !== undefined ? Object.values(modelState).join('\n') : erro.error?.Message || '';

    if (status === 400)
      this.Erro = `Verifique os dados que estão sendo enviados.\n${message}`;
    else if (status === 404)
      this.Erro = `E-mail e/ou senha incorretos.\n${message}`;
    else if (status === 500)
      this.Erro = `Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`;
    else if (status === 0)
      this.Erro = `Falha na requisição.\nEntre em contato com o suporte.\n${message}`;
  }  
}
