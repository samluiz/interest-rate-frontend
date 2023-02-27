import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output()
  close = new EventEmitter<any>();

  isOpen: boolean = false;

  onClose() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }
}
