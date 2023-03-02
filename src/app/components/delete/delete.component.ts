import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(
    private service: ApiService,
    private click: GetUUIDService,
    private snackBar: MatSnackBar
  ) {}

  @Output()
  close = new EventEmitter<boolean>();

  @Output()
  submit = new EventEmitter<boolean>();

  uuid: string = '';

  onClose() {
    this.close.emit(false);
  }

  delete(uuid: string) {
    this.service.delete(uuid).subscribe({
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

  onSubmit() {
    this.click.getUUID().subscribe((uuid) => {
      this.uuid = uuid;
    });
    this.delete(this.uuid);
  }

  openSnackBar() {
    this.snackBar.open('Registro removido com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
