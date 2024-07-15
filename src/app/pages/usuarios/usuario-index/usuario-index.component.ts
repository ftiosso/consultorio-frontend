import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.css'
})
export class UsuarioIndexComponent {

  Usuarios: Usuario[];

  Id: number | null;
  Nome: string;

  constructor(private usuariosService:UsuariosService,
              private dialog:MatDialog){
    this.Usuarios = [];
    this.Id = null;
    this.Nome = '';
  }

  definirPesquisa(): void{

    this.Usuarios = [];

    if (this.Id || this.Id === 0) {
      this.pesquisarPorId();
      return;
    }

    if (this.Nome) {
      this.pesquisarPorNome();
      return;
    }

    this.pesquisar();
  }

  pesquisar(): void{
    
    this.usuariosService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonUsuarios:Usuario[]) => {
        this.Usuarios = jsonUsuarios;
        if (this.Usuarios.length === 0) 
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorId() :void{
    this.usuariosService.getById(Number(this.Id))
    .pipe(take(1))
    .subscribe({
      next: (jsonMedicamento:Usuario) => {
        this.Usuarios = [jsonMedicamento];
      },
      error: (jsonErro: HttpErrorResponse) => {
        this.exibirMensagemErro(jsonErro);
      }
    });
  }

  pesquisarPorNome(): void{
    
    this.usuariosService.getByNome(this.Nome)
    .pipe(take(1))
    .subscribe({
      next: (jsonUsuarios:Usuario[]) => {
        this.Usuarios = jsonUsuarios;
        if (this.Usuarios.length === 0) 
          this.exibirMensagemErro(new HttpErrorResponse({status:404}));
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

    if (status === 404)
      this.exibirMensagem(`Nenhum usuário encontrado.\n${message}`);
    else if (status === 500)
      this.exibirMensagem(`Erro interno no servidor!\nEntre em contato com o suporte.\n${message}`);
    else if (status === 0)
      this.exibirMensagem(`Falha na requisição.\nEntre em contato com o suporte.\n${message}`);
  }

  exibirMensagem(msg:string):void{
    this.dialog.open(AlertComponent, {data:{mensagem:msg}});
  }
}