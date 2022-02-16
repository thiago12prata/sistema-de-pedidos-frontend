import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Injectable } from "@angular/core";
import { LocalUser } from '../models/local_user';
import { Carrinho } from '../models/carrinho';

@Injectable()
export class StorageService {

  getLocalUser() : LocalUser{
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if(user == null){
      return null
    }
    else{
      return JSON.parse(user);
    }
  }
  setLocalUser(obj : LocalUser){
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else{
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCarrinho() : Carrinho{
    let carrinhoStr = localStorage.getItem(STORAGE_KEYS.carrinho);
    if(carrinhoStr == null){
      return null
    }
    else{
      return JSON.parse(carrinhoStr);
    }
  }
  setCarrinho(obj : Carrinho){
    if(obj != null){
      localStorage.setItem(STORAGE_KEYS.carrinho, JSON.stringify(obj));
    }
    else{
      localStorage.removeItem(STORAGE_KEYS.carrinho);
    }
  }
}
