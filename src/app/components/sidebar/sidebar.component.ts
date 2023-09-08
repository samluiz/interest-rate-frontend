import { Component } from '@angular/core';
import { FormTypeService } from 'src/app/services/form-type.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private type: FormTypeService) {}

  isOpen: boolean = false;
  width: string = '';
  transform: string = '';

  sendFormType() {
    this.type.sendType(false);
  }

  toggleSidebar() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.width = '10%';
      this.transform = 'rotate(180deg)';
    } else {
      this.isOpen = false;
      this.width = '';
      this.transform = '';
    }
  }
}
