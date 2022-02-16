import { ProdutoDTO } from './../../models/produto.dto';
import { Carrinho } from './../../models/carrinho';
import { StorageService } from './../storage.service';
import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoService{

  constructor(
    public storage : StorageService
  ){}

  criarOuLimparCarrinho() : Carrinho{
    let carrinho: Carrinho = {itens: []};
    this.storage.setCarrinho(carrinho);
    return carrinho;
  }

  getCarrinho(): Carrinho{
    let carrinho : Carrinho = this.storage.getCarrinho();
    if(carrinho == null){
      carrinho = this.criarOuLimparCarrinho();
    }
    return carrinho;
  }

  adicionarProduto( produto : ProdutoDTO) : Carrinho{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao == -1){
      carrinho.itens.push({quantidade: 1, produto: produto})
    }
    this.storage.setCarrinho(carrinho);
    return carrinho;
  }
}
