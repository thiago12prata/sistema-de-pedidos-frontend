import { CarrinhoService } from './domain/carrinho.service';
import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';

import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  jwHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public carrinhoService: CarrinhoService) {
  }

  authenticate(creds : CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  sucessfullLogin(authorizationValue : string){
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
      token : tok,
      email : this.jwHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    this.carrinhoService.criarOuLimparCarrinho();
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  logout(){
    this.storage.setLocalUser(null);
  }
}
