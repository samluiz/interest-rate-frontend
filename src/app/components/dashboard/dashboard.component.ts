import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICreditOperationResponse } from 'src/app/interfaces/CreditOperationInterface';
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
  isFiltered: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.fetchData();
  }

  selectSize(e: string) {
    if (this.size !== Number(e)) {
      this.size = Number(e);
      this.fetchData();
    }
  }

  filter(query: string) {
    this.anoMes = query;
    this.page = 0;
    this.isFiltered = true;
    this.fetchData();
  }

  clearFilter() {
    this.anoMes = '';
    this.page = 0;
    this.isFiltered = false;
    this.fetchData();
  }

  onInputChange(query: string) {
    if (query && query.length === 7 && query.match('\\d{4}-\\d{2}')) {
      this.filter(query);
    }
    if (this.isFiltered && query.length < 7) {
      this.clearFilter();
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
}
