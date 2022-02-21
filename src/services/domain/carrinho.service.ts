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

  removerProduto( produto : ProdutoDTO) : Carrinho{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens.splice(posicao, 1);
    }
    this.storage.setCarrinho(carrinho);
    return carrinho;
  }

  incrementarQtd( produto : ProdutoDTO) : Carrinho{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens[posicao].quantidade++;
    }
    this.storage.setCarrinho(carrinho);
    return carrinho;
  }

  decrementarQtd( produto : ProdutoDTO) : Carrinho{
    let carrinho = this.getCarrinho();
    let posicao = carrinho.itens.findIndex(x => x.produto.id == produto.id);
    if(posicao != -1){
      carrinho.itens[posicao].quantidade--;
      if(carrinho.itens[posicao].quantidade < 1){
        carrinho = this.removerProduto(produto);
      }
    }
    this.storage.setCarrinho(carrinho);
    return carrinho;
  }

  total() : number {
    let carrinho = this.getCarrinho();
    let soma = 0;
    for (var i = 0; i< carrinho.itens.length; i++) {
      soma += carrinho.itens[i].produto.preco * carrinho.itens[i].quantidade;
    }
    return soma;
  }
}
