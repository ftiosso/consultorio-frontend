import { Component } from '@angular/core';
import { Usuario } from '../../models/model.usuario';
import { AutenticacaoService } from '../../services/autenticacoes/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  Usuario: Usuario;

  constructor(private autenticacaoService: AutenticacaoService,
              private router: Router){
    this.Usuario = autenticacaoService.obterUsuarioAutenticado();
  }

  ngOnInit(): void{
    if (!this.autenticacaoService.isAutenticado)
      this.router.navigate(['/login']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.autenticacaoService.desautenticar();
    this.router.navigate(['/login']);
  }

}
