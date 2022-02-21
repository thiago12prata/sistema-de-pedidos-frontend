import { ProdutoService } from './../../services/domain/produto.service';
import { CarrinhoService } from './../../services/domain/carrinho.service';
import { StorageService } from './../../services/storage.service';
import { ItemCarrinho } from './../../models/itemCarrinho';
import { Carrinho } from './../../models/carrinho';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  itens: ItemCarrinho[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carrinhoService: CarrinhoService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.itens = this.carrinhoService.getCarrinho().itens;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for (var i=0; i < this.itens.length; i++){
      let item = this.itens[i]
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error =>{});
    }
  }

  incrementarQtd( produto : ProdutoDTO){
    this.itens = this.carrinhoService.incrementarQtd(produto).itens;
  }

  decrementarQtd( produto : ProdutoDTO){
    this.itens = this.carrinhoService.decrementarQtd(produto).itens;
  }

  removerProduto( produto : ProdutoDTO){
    this.itens = this.carrinhoService.removerProduto(produto).itens;
  }

  total() : number{
    return this.carrinhoService.total();
  }

  continuarComprando(){
    this.navCtrl.setRoot('CategoriasPage')
  }
}
