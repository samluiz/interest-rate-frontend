import { Injectable } from '@angular/core';
import { ICreditOperation } from '../interfaces/CreditOperationInterface';

@Injectable({
  providedIn: 'root',
})
export class ValidateUtil {
  isValid(data: ICreditOperation): boolean {
    if (
      data.instituicao_financeira &&
      data.ano_mes &&
      data.cnpj_8 &&
      data.mes &&
      data.modalidade &&
      data.posicao &&
      data.taxa_juros_ao_ano &&
      data.taxa_juros_ao_mes
    ) {
      return true;
    } else {
      return false;
    }
  }
}
