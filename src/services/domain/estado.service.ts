import { EstadoDTO } from '../../models/estado.dto';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EstadosService{

  constructor(public http: HttpClient){

  }
  findAll() : Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
  }
}
