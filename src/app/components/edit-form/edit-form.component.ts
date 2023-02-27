import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
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
  submit = new EventEmitter<any>();

  constructor(
    private service: ApiService,
    private snackBar: MatSnackBar,
    private click: GetUUIDService
  ) {}

  update(uuid: string, data: any) {
    this.service.update(uuid, data).subscribe({
      next: () => this.openSnackBar(),
      error: (e) => console.error(e),
    });
  }

  onSubmit(data: any) {
    if (data.instituicao_financeira) {
      this.click.getUUID().subscribe((uuid) => {
        this.uuid = uuid;
      });
      this.update(this.uuid, data);
      this.submit.emit(true);
    }
  }

  openSnackBar() {
    this.snackBar.open('Registro editado com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
