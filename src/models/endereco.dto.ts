import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO{
  id : string;
  logradouro : string;
  numero : string;
  bairro: string;
  complemento: string;
  cep: string;
  cidade: CidadeDTO;
}
