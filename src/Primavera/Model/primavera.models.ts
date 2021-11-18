export default interface Primavera {
  Linhas: {
    Artigo: string;
    IVA: number;
    Descricao: string;
    Quantidade: number;
    Valor: string;
  }[];
  Tipodoc: "FA";
  Serie: "C";
  Entidade: number;
  TipoEntidade: "C";
  DataDoc: string;
  DataVenc: string;
}

export interface PrimaveraToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PrimaveraCustomer {
  Cliente: number;
  Nome: string;
  Descricao?: string;
  Morada: string;
  Localidade: string;
  CodigoPostal?: string;
  LocalidadeCodigoPostal?: string;
  Telefone: string;
  Fax?: string;
  EnderecoWeb?: string;
  Distrito?: string;
  NumContribuinte?: string;
  Pais?: "ANG";
  Moeda?: "AKZ";
}
