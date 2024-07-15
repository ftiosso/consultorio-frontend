import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/model.usuario';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

   private readonly apiURL:string;

   constructor(private httpClient:HttpClient) {
      this.apiURL = `${environment.apiURL}/usuarios`;
   }

   getAll(): Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(this.apiURL);
   }

   getById(id: number): Observable<Usuario>{
      return this.httpClient.get<Usuario>(`${this.apiURL}/${id}`);
   }

   getByNome(nome: string): Observable<Usuario[]>{
      return this.httpClient.get<Usuario[]>(`${this.apiURL}?nome=${nome}`);
   }

   post(usuario: Usuario): Observable<Usuario>{
      return this.httpClient.post<Usuario>(this.apiURL,usuario);
   }

   put(usuario:Usuario): Observable<Usuario>{
      return this.httpClient.put<Usuario>(`${this.apiURL}/${usuario.Id}`,usuario);
   }

   delete(id:number): Observable<void>{
      return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
   }
}