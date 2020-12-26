import { Injectable } from '@angular/core';
import { Comunidad } from '../models/comunidad';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {


  readonly URL_API_COMUNIDAD = 'http://localhost:3000/api/comunidades';

  comunidad : Comunidad;
  selectedComunidad:Comunidad;
  constructor(private http: HttpClient) { 
    this.selectedComunidad = new Comunidad();
  }


  public createComunity(comunidad: Comunidad, id_user:string){
    const id = id_user;
    return this.http.post(this.URL_API_COMUNIDAD +`/${id_user}`,comunidad);
  }

  public getOneComunity(idComunidad: string) {
    return this.http.get(this.URL_API_COMUNIDAD + `/${idComunidad}`).pipe(tap((res : Comunidad) => {}));
  }
}
