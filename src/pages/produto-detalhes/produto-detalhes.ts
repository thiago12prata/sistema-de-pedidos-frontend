import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-produto-detalhes',
  templateUrl: 'produto-detalhes.html',
})
export class ProdutoDetalhesPage {


    item : ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }
  }

}
