import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreditOperation } from '../interfaces/CreditOperationInterface';

// Development
// const baseUrl = 'http://localhost/api/taxaJurosMensal';

// Production
const baseUrl = 'https://site-hbc3xbu7kq-ue.a.run.app/api/taxaJurosMensal';

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
