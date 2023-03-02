import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ICreditOperation } from 'src/app/interfaces/CreditOperationInterface';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';
import { ValidateUtil } from 'src/app/utils/validate.util';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent {
  clickSubscription!: Subscription;
  uuid: string = '';

  @Output()
  submit = new EventEmitter<boolean>();

  constructor(
    private service: ApiService,
    private snackBar: MatSnackBar,
    private click: GetUUIDService,
    private validate: ValidateUtil
  ) {}

  update(uuid: string, data: ICreditOperation) {
    this.service.update(uuid, data).subscribe({
      next: () => this.submit.emit(true),
      error: (e) => {
        this.submit.emit(false);
        console.error(e);
      },
    });
  }

  onSubmit(data: ICreditOperation) {
    if (this.validate.isValid(data)) {
      this.click.getUUID().subscribe((uuid) => {
        this.uuid = uuid;
      });
      this.update(this.uuid, data);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro editado com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
