import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../../models/model.medicamento';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MedicamentosService {
  
  private readonly apiURL:string;

  constructor(private httpClient:HttpClient) { 
     this.apiURL = `${environment.apiURL}/medicamentos`;   
  }

  getAll() :Observable<Medicamento[]>{
    return this.httpClient.get<Medicamento[]>(this.apiURL);
  }

  getById(id:number) :Observable<Medicamento>{
    return this.httpClient.get<Medicamento>(`${this.apiURL}/${id}`);
  }

  getByNome(nome:string) :Observable<Medicamento[]>{
    return this.httpClient.get<Medicamento[]>(`${this.apiURL}?nome=${nome}`);
  }

  put(medicamento: Medicamento) :Observable<Medicamento>{
    return this.httpClient.put<Medicamento>(`${this.apiURL}/${medicamento.Id}`,medicamento);
  }

  post(medicamento: Medicamento) :Observable<Medicamento>{
    return this.httpClient.post<Medicamento>(this.apiURL,medicamento);
  }

  delete(id:number) :Observable<void>{
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`);
  }
}
