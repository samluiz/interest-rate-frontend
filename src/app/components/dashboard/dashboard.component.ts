import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private service: ApiService,
    private click: GetUUIDService
  ) {
    this.url = window.location.href;
    this.changed = new URL(this.url).searchParams.get('changed') === 'true';
  }

  ngOnInit(): void {
    this.findAll();
    if (this.changed) {
      this.openSnackBar();
    }
  }

  url: string;
  changed: boolean = false;
  uuid: string = '';
  index: number = 0;
  isEdit: boolean = false;
  isDelete: boolean = false;
  isModalOpen: boolean = false;

  reloadPage() {
    if (new URL(this.url).searchParams.has('changed')) {
      window.location.reload();
    }
    if (!this.changed) {
      window.location.href = this.url + '?changed=true';
    }
  }

  onDelete(isSubmitted: boolean) {
    setTimeout(() => this.reloadPage(), 100);
  }

  onUpdate(isSubmitted: boolean) {
    setTimeout(() => this.reloadPage(), 100);
  }

  closeModal(event: any) {
    if (this.isModalOpen) {
      this.isEdit = event.isOpen;
      this.isDelete = event.isOpen;
      this.isModalOpen = event.isOpen;
    }
  }

  toggleEditModal(uuid: string, index: number) {
    this.isModalOpen = true;
    this.isEdit = true;
    this.uuid = uuid;
    this.index = index;
    this.click.sendClickEvent(uuid);
  }

  toggleDeleteModal(uuid: string, index: number) {
    this.isModalOpen = true;
    this.isDelete = true;
    this.uuid = uuid;
    this.index = index;
    this.click.sendClickEvent(uuid);
  }

  updated: any = {};
  data: Array<any> = [];
  totalPages: number = 0;
  totalItems: number = 0;
  size: number = 10;
  page: number = 0;
  anoMes: string = '';

  findAll() {
    this.service.findAll(this.size, this.page, this.anoMes).subscribe({
      next: (data: any) => {
        this.data = data.results;
        this.totalPages = data.total_pages;
        this.totalItems = data.total_items;
      },
      error: (e) => console.error(e),
    });
  }

  renderPage(event: number) {
    this.page = event;
    this.findAll();
  }

  openSnackBar() {
    this.snackBar.open('Registro removido com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
