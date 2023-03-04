import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ICreditOperation } from 'src/app/interfaces/CreditOperationInterface';
import { ISubmitted } from 'src/app/interfaces/SubmitInterface';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent {
  clickSubscription!: Subscription;
  uuid: string = '';

  @Output()
  close = new EventEmitter<any>();

  @Output()
  submit = new EventEmitter<boolean>();

  constructor(
    private service: ApiService,
    private snackBar: MatSnackBar,
    private click: GetUUIDService
  ) {}

  onClose() {
    this.close.emit(false);
  }

  update(uuid: string, data: ICreditOperation) {
    this.service.update(uuid, data).subscribe({
      next: () => {
        this.submit.emit(true);
        this.onClose();
        this.openSnackBar();
      },
      error: (e) => {
        this.submit.emit(false);
        console.error(e);
      },
    });
  }

  onSubmit(data: ISubmitted) {
    if (data.isValid) {
      this.click.getUUID().subscribe((uuid) => {
        this.uuid = uuid;
      });
      this.update(this.uuid, data.data);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro editado com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
