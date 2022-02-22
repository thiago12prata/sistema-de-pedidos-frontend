import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CarrinhoService } from './../../services/domain/carrinho.service';
import { ItemCarrinho } from './../../models/itemCarrinho';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-confirmar-pedido',
  templateUrl: 'confirmar-pedido.html',
})
export class ConfirmarPedidoPage {

  pedido: PedidoDTO;
  itensCarrinho: ItemCarrinho[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carrinhoService: CarrinhoService,
    public clienteService: ClienteService) {
      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.itensCarrinho = this.carrinhoService.getCarrinho().itens;
    this.clienteService.findByiId(this.pedido.cliente.id)
    .subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id, response['enderecos'])
    },
    error =>{
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findEndereco(id: string, list : EnderecoDTO[]) : EnderecoDTO{
    let posicao = list.findIndex(x => x.id == id);
    return list[posicao];
  }

  total(){
    return this.carrinhoService.total();
  }
}
