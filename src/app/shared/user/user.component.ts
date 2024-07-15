import { Component } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacoes/autenticacao.service';
import { Usuario } from '../../models/model.usuario';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  Usuario: Usuario;

  constructor(private autenticacaoService:AutenticacaoService){
    this.Usuario = autenticacaoService.obterUsuarioAutenticado();
  }
}
