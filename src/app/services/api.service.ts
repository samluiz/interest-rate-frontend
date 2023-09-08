import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { ICreditOperation } from '../interfaces/CreditOperationInterface';

let baseUrl = '';

if (isDevMode()) {
  baseUrl = 'http://localhost/api/taxaJurosMensal';
} else {
  baseUrl = 'https://interest-rate-api-saurs.koyeb.app/api/taxaJurosMensal';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  findAll(size: number, page: number, anoMes: string) {
    return this.http.get(
      `${baseUrl}?anoMes=${anoMes}&size=${size}&page=${page}`
    );
  }

  findByUUID(uuid: string) {
    return this.http.get(baseUrl + '/' + uuid);
  }

  create(data: ICreditOperation) {
    return this.http.post(baseUrl, data);
  }

  update(uuid: string, data: ICreditOperation) {
    return this.http.put(baseUrl + '/' + uuid, data);
  }

  delete(uuid: string) {
    return this.http.delete(baseUrl + '/' + uuid);
  }
}
