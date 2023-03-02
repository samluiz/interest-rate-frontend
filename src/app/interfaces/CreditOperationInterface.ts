export interface ICreditOperation {
  instituicao_financeira: string | null | undefined;
  cnpj_8: string | null | undefined;
  modalidade: string | null | undefined;
  posicao: number | null | undefined;
  taxa_juros_ao_ano: number | null | undefined;
  taxa_juros_ao_mes: number | null | undefined;
  mes: string | null | undefined;
  ano_mes: string | null | undefined;
}

export interface ICreditOperationResponse {
  uuid: string;
  instituicao_financeira: string | null | undefined;
  cnpj_8: string | null | undefined;
  modalidade: string | null | undefined;
  posicao: number | null | undefined;
  taxa_juros_ao_ano: number | null | undefined;
  taxa_juros_ao_mes: number | null | undefined;
  mes: string | null | undefined;
  ano_mes: string | null | undefined;
}
