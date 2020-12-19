import { Injectable } from '@angular/core';
import { Comunidad } from '../models/comunidad';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {


  readonly URL_API_COMUNIDAD = 'http://localhost:3000/api/comunidades';

  comunidad : Comunidad;
  constructor(private http: HttpClient) { 

  }


  public createComunity(comunidad: Comunidad){
    return this.http.post(this.URL_API_COMUNIDAD +`/`,comunidad);
  }
}
