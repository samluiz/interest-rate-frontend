import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICreditOperation } from 'src/app/interfaces/CreditOperationInterface';
import { ApiService } from 'src/app/services/api.service';
import { ValidateUtil } from 'src/app/utils/validate.util';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  constructor(
    private service: ApiService,
    private snackBar: MatSnackBar,
    private validate: ValidateUtil
  ) {}

  create(data: ICreditOperation) {
    this.service.create(data).subscribe({
      next: () => this.openSnackBar(),
      error: (e) => console.error(e),
    });
  }

  onSubmit(data: ICreditOperation) {
    if (this.validate.isValid(data)) {
      this.create(data);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro salvo com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
