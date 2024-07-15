import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../../models/model.paciente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

   private readonly apiURL:string;

   constructor(private httpClient:HttpClient) { 
      this.apiURL = `${environment.apiURL}/pacientes`;   
   }

   getAll(): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(this.apiURL);
   }

   getByCodigo(codigo: number): Observable<Paciente>{
      return this.httpClient.get<Paciente>(`${this.apiURL}/${codigo}`);
   }

   getByNome(nome: string): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(`${this.apiURL}?nome=${nome}`);
   }

   post(paciente: Paciente): Observable<Paciente>{
      return this.httpClient.post<Paciente>(this.apiURL,paciente);
   }

   put(paciente:Paciente): Observable<Paciente>{
      return this.httpClient.put<Paciente>(`${this.apiURL}/${paciente.Codigo}`,paciente);
   }

   delete(codigo:number): Observable<void>{
      return this.httpClient.delete<void>(`${this.apiURL}/${codigo}`);
   }
}
