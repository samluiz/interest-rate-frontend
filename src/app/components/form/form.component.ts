import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';
import { FormTypeService } from 'src/app/services/form-type.service';
import { DateUtil } from 'src/app/utils/date.util';
import { ICreditOperation } from 'src/app/interfaces/CreditOperationInterface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: ApiService,
    private click: GetUUIDService,
    private type: FormTypeService,
    private utils: DateUtil
  ) {}

  ngOnInit(): void {
    if (!/adicionar/.test(window.location.href)) {
      this.populateForm();
    }
  }

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  isEdit: boolean = false;

  @ViewChild('regForm', { static: false })
  form!: NgForm;

  @Output()
  submit = new EventEmitter<any>();

  group = this.builder.group({
    instituicaoFinanceira: ['', Validators.required],
    cnpj8: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    modalidade: ['', Validators.required],
    posicao: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    taxaJurosAno: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    taxaJurosMes: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    mes: [
      this.currentMonth < 12 ? this.currentMonth + 1 : this.currentMonth,
      [Validators.required, Validators.maxLength(2), Validators.minLength(1)],
    ],
    ano: [
      this.currentYear,
      [Validators.required, Validators.maxLength(4), Validators.minLength(4)],
    ],
  });

  get instituicaoFinanceira() {
    return this.group.get('instituicaoFinanceira');
  }

  get cnpj8() {
    return this.group.get('cnpj8');
  }

  get modalidade() {
    return this.group.get('modalidade');
  }

  get posicao() {
    return this.group.get('posicao');
  }

  get taxaJurosAno() {
    return this.group.get('taxaJurosAno');
  }

  get taxaJurosMes() {
    return this.group.get('taxaJurosMes');
  }

  get mes() {
    return this.group.get('mes');
  }

  get ano() {
    return this.group.get('ano');
  }

  invalidChars: Array<string> = ['-', '+', 'e', '.'];

  validateNumbers(e: KeyboardEvent) {
    if (this.invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  }

  replaceInvalid(e: any) {
    e.target.value = e.target.value.replace(/[e\+\-\.]/gi, '');
  }

  labelInst: string = 'Instituição financeira';
  labelCnpj_8: string = 'CNPJ_8';
  labelModalidade: string = 'Modalidade';
  labelPosicao: string = 'Posição';
  labelTaxaAno: string = 'Taxa de juros ao ano';
  labelTaxaMes: string = 'Taxa de juros ao mês';
  labelMes: string = 'Mês';
  labelAnoMes: string = 'Ano-mês';

  notNullError: string = 'Este campo não pode ser nulo.';
  lengthCnpjError: string = 'Este campo deve ter 8 dígitos.';
  lengthMesError: string = 'Este campo deve ter no máximo 2 dígitos de 1 a 12.';
  lengthAnoError: string = `Este campo deve ser um ano de 4 dígitos entre 1900 até ${this.currentYear}.`;
  mustBeNumberError: string = 'Este campo não pode conter letras.';

  getCnpjErrorMessage() {
    if (this.cnpj8?.hasError('required')) {
      return this.notNullError;
    }
    if (this.cnpj8?.hasError('pattern')) {
      return this.mustBeNumberError;
    }

    return this.lengthCnpjError;
  }

  getPosicaoErrorMessage() {
    if (this.posicao?.hasError('pattern')) {
      return this.mustBeNumberError;
    }

    return this.mustBeNumberError;
  }

  getTaxaAnoErrorMessage() {
    if (this.taxaJurosAno?.hasError('pattern')) {
      return this.mustBeNumberError;
    }

    return this.mustBeNumberError;
  }

  getTaxaMesErrorMessage() {
    if (this.taxaJurosMes?.hasError('pattern')) {
      return this.mustBeNumberError;
    }

    return this.notNullError;
  }

  getMesErrorMessage() {
    if (this.mes?.hasError('required')) {
      return this.notNullError;
    }

    return this.lengthMesError;
  }

  getAnoErrorMessage() {
    if (this.ano?.hasError('required')) {
      return this.notNullError;
    }

    return this.lengthAnoError;
  }

  onSubmit() {
    if (this.group.valid) {
      let mes: number = this.mes?.value!;
      let ano: number = this.ano?.value!;
      let mesAno: string = this.utils.convertMonthYear(mes, ano);
      let anoMes: string = this.utils.convertYearMonth(mes, ano);
      let data: ICreditOperation = {
        instituicao_financeira: this.instituicaoFinanceira?.value,
        cnpj_8: this.cnpj8?.value,
        modalidade: this.modalidade?.value,
        posicao: this.posicao?.value,
        taxa_juros_ao_ano: this.taxaJurosAno?.value,
        taxa_juros_ao_mes: this.taxaJurosMes?.value,
        mes: mesAno,
        ano_mes: anoMes,
      };
      this.submit.emit(data);
      this.form.resetForm();
    }
  }

  getFormType(): boolean {
    this.type.getType().subscribe((type) => {
      this.isEdit = type;
    });
    return this.isEdit;
  }

  populateForm() {
    if (this.getFormType()) {
      this.click.getUUID().subscribe((uuid) => {
        this.findByUUID(uuid);
      });
    }
  }

  findByUUID(uuid: string): any {
    this.service.findByUUID(uuid).subscribe({
      next: (data: any) => {
        let { uuid, _links, ...rest } = data;
        this.group.setValue({
          instituicaoFinanceira: rest.instituicao_financeira,
          cnpj8: rest.cnpj_8,
          modalidade: rest.modalidade,
          posicao: rest.posicao,
          taxaJurosAno: rest.taxa_juros_ao_ano,
          taxaJurosMes: rest.taxa_juros_ao_mes,
          mes: this.utils.getMonthNumber(rest.mes.slice(0, 3)),
          ano: rest.ano_mes.slice(0, 4),
        });
      },
      error: (e) => console.error(e),
    });
  }
}
