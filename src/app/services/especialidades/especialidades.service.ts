import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Especialidade } from '../../models/model.especialidade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private readonly apiURL:string;

   constructor(private httpClient:HttpClient) { 
      this.apiURL = `${environment.apiURL}/especialidades`;   
   }

   getAll(): Observable<Especialidade[]>{
      return this.httpClient.get<Especialidade[]>(this.apiURL);
   }

   getById(id: number): Observable<Especialidade>{
      return this.httpClient.get<Especialidade>(`${this.apiURL}/${id}`);
   }

   getByNome(nome: string): Observable<Especialidade[]>{
      return this.httpClient.get<Especialidade[]>(`${this.apiURL}?nome=${nome}`);
   }

   post(especialidade: Especialidade): Observable<Especialidade>{
      return this.httpClient.post<Especialidade>(this.apiURL,especialidade);
   }

   put(especialidade:Especialidade): Observable<Especialidade>{
      return this.httpClient.put<Especialidade>(`${this.apiURL}/${especialidade.Id}`,especialidade);
   }

   delete(id:number): Observable<void>{
      return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
   }
}
