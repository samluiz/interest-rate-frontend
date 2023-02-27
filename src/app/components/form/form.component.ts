import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(
    private builder: FormBuilder,
    private service: ApiService,
    private click: GetUUIDService
  ) {}

  selected!: string;

  @ViewChild('regForm', { static: false })
  form!: NgForm;

  @Output()
  submit = new EventEmitter<any>();

  group = this.builder.group({
    instituicao_financeira: ['', Validators.required],
    cnpj_8: ['', [Validators.required, Validators.minLength(8)]],
    modalidade: ['', Validators.required],
    posicao: [null, Validators.required],
    taxa_juros_ao_ano: [null, Validators.required],
    taxa_juros_ao_mes: [null, Validators.required],
    mes: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[a-zA-Z]{3}-\\d{4}'),
      ],
    ],
    ano_mes: [
      '',
      [
        Validators.required,
        Validators.pattern('\\d{4}-\\d{2}'),
        Validators.minLength(7),
      ],
    ],
  });

  get instituicao_financeira() {
    return this.group.get('instituicao_financeira');
  }

  get cnpj_8() {
    return this.group.get('cnpj_8');
  }

  get modalidade() {
    return this.group.get('modalidade');
  }

  get posicao() {
    return this.group.get('posicao');
  }

  get taxa_juros_ao_ano() {
    return this.group.get('taxa_juros_ao_ano');
  }

  get taxa_juros_ao_mes() {
    return this.group.get('taxa_juros_ao_mes');
  }

  get mes() {
    return this.group.get('mes');
  }

  get ano_mes() {
    return this.group.get('ano_mes');
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

  length8Error: string = 'Este campo deve ter 8 dígitos.';

  length7Error: string = 'Este campo deve ter 7 dígitos.';

  anoMesPatternError: string =
    'Este campo deve estar no padrão yyyy-mm. ex: 2021-12';

  mesPatternError: string =
    'Este campo deve estar no padrão mmm-yyyy. ex: Ago-2022';

  getCnpjErrorMessage() {
    if (this.cnpj_8?.hasError('required')) {
      return this.notNullError;
    }

    return this.length8Error;
  }

  getMesErrorMessage() {
    if (this.mes?.hasError('required')) {
      return this.notNullError;
    }

    return this.mesPatternError;
  }

  getAnoMesErrorMessage() {
    if (this.ano_mes?.hasError('required')) {
      return this.notNullError;
    }
    return this.anoMesPatternError;
  }

  onSubmit() {
    if (this.group.valid) {
      this.submit.emit(this.group.value);
      this.form.resetForm();
    }
  }

  findByUUID(uuid: string) {
    this.service.findByUUID(uuid).subscribe({
      next: (data) => {
        return data;
      },
      error: (e) => console.log(e),
    });
  }
}
