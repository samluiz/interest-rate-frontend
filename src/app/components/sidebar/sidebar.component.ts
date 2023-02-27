import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen: boolean = false;
  width: string = '';
  transform: string = '';
  fontSize: string = '';
  opacity: string = '';
  visibility: string = '';

  toggleSidebar() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.width = '20%';
      this.transform = 'rotate(180deg)';
      this.opacity = '1';
      this.visibility = 'visible';
    } else {
      this.isOpen = false;
      this.width = '';
      this.transform = '';
      this.opacity = '';
      this.visibility = '';
    }
  }
}
