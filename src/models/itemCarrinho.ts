import { ProdutoDTO } from "./produto.dto";

export interface ItemCarrinho {
    quantidade: number,
    produto: ProdutoDTO
}
