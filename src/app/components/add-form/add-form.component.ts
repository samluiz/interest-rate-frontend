import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  constructor(private service: ApiService, private snackBar: MatSnackBar) {}

  @Output()
  index = new EventEmitter<any>();

  create(data: any) {
    this.service.create(data).subscribe({
      next: () => this.openSnackBar(),
      error: (e) => console.error(e),
    });
  }

  onSubmit(data: any) {
    if (data.instituicao_financeira) {
      this.create(data);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro enviado com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
