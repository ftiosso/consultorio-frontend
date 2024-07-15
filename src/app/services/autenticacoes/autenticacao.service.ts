import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/model.usuario';
import { Observable, tap } from 'rxjs';
import { Login } from '../../models/model.login';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly apiURL:string;

  constructor(private httpClient:HttpClient) { 
     this.apiURL = `${environment.apiURL}/autenticacoes`;   
  }

  autenticar(login: Login) :Observable<Usuario>{
    return this.httpClient
      .post<Usuario>(this.apiURL, login)
      .pipe(tap({
        next: (jsonUsuario:Usuario) =>{
          localStorage.setItem('usuario',btoa(JSON.stringify(jsonUsuario)))
        }
      }));
  }

  desautenticar() {
    localStorage.clear();
  }

  obterUsuarioAutenticado(): Usuario {
    const usuario: string | null = localStorage.getItem('usuario');
    return usuario !== null ? JSON.parse(atob(usuario)) : null;
  }

  get isAutenticado(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }  
}