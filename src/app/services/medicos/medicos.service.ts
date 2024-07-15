import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Medico } from '../../models/model.medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private readonly apiURL:string;

  constructor(private httpClient:HttpClient) { 
      this.apiURL = `${environment.apiURL}/medicos`;
   }

  getAll(): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>(this.apiURL);
  }

  getById(id: number): Observable<Medico>{
    return this.httpClient.get<Medico>(`${this.apiURL}/${id}`);
  }

  getByCRM(crm: string): Observable<Medico>{
    return this.httpClient.get<Medico>(`${this.apiURL}?crm=${crm}`);
  }

  getByNome(nome: string): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>(`${this.apiURL}?nome=${nome}`);
  }

  post(medico: Medico): Observable<Medico>{
    return this.httpClient.post<Medico>(this.apiURL,medico);
  }

  put(medico:Medico): Observable<Medico>{
    return this.httpClient.put<Medico>(`${this.apiURL}/${medico.Id}`,medico);
  }

  delete(id:number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }
}