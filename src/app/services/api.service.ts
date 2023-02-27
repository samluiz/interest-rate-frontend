import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:6868/api/taxaJurosMensal';

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

  create(data: object) {
    return this.http.post(baseUrl, data);
  }

  update(uuid: string, data: object) {
    return this.http.put(baseUrl + '/' + uuid, data);
  }

  delete(uuid: string) {
    return this.http.delete(baseUrl + '/' + uuid);
  }
}
