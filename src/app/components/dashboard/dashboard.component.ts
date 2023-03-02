import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ICreditOperation,
  ICreditOperationResponse,
} from 'src/app/interfaces/CreditOperationInterface';
import { ApiService } from 'src/app/services/api.service';
import { GetUUIDService } from 'src/app/services/click.service';
import { FormTypeService } from 'src/app/services/form-type.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private service: ApiService,
    private click: GetUUIDService,
    private type: FormTypeService
  ) {}

  data: Array<ICreditOperationResponse> = [];
  anoMesInput = new FormControl('');
  totalPages: number = 0;
  totalItems: number = 0;
  size: number = 10;
  page: number = 0;
  anoMes: string = '';
  uuid: string = '';
  index: number = 0;
  isEdit: boolean = false;
  isDelete: boolean = false;
  isModalOpen: boolean = false;

  @Input()
  isChecked: boolean = false;

  ngOnInit(): void {
    this.fetchData();
  }

  uncheck() {
    if (!this.isChecked) {
      this.anoMes = '';
    }
  }

  onInputChange(query: string) {
    if (query && query.length === 7 && query.match('\\d{4}-\\d{2}')) {
      this.anoMes = query;
      this.page = 0;
      this.fetchData();
    }
  }

  onDelete(isSubmitted: boolean) {
    if (isSubmitted === true) {
      this.fetchData();
    }
  }

  onUpdate(isSubmitted: boolean) {
    if (isSubmitted === true) {
      this.fetchData();
    }
  }

  closeModal(isOpen: any) {
    if (this.isModalOpen) {
      this.isEdit = false;
      this.isDelete = isOpen;
      this.isModalOpen = isOpen;
      this.type.sendType(this.isEdit);
    }
  }

  toggleEditModal(uuid: string) {
    this.isModalOpen = true;
    this.isEdit = true;
    this.uuid = uuid;
    this.click.sendUUID(uuid);
    this.type.sendType(this.isEdit);
  }

  toggleDeleteModal(uuid: string) {
    this.isModalOpen = true;
    this.isDelete = true;
    this.uuid = uuid;
    this.click.sendUUID(uuid);
  }

  fetchData() {
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
    this.fetchData();
  }

  openSnackBar() {
    this.snackBar.open('Operação concluída com sucesso.', 'Fechar', {
      duration: 3000,
    });
  }
}
