import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICreditOperation } from 'src/app/interfaces/CreditOperationInterface';
import { ISubmitted } from 'src/app/interfaces/SubmitInterface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  constructor(private service: ApiService, private snackBar: MatSnackBar) {}

  create(data: ICreditOperation) {
    this.service.create(data).subscribe({
      next: () => this.openSnackBar(),
      error: (e) => console.error(e),
    });
  }

  onSubmit(data: ISubmitted) {
    if (data.isValid) {
      this.create(data.data);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro salvo com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
