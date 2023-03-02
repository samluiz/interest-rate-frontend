import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  constructor(private service: ApiService, private click: GetUUIDService) {}

  @Output()
  close = new EventEmitter<any>();

  @Output()
  submit = new EventEmitter<any>();

  isOpen: boolean = false;
  uuid: string = '';

  onClose() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

  delete(uuid: string) {
    this.service.delete(uuid).subscribe({
      next: () => this.submit.emit(true),
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
}
