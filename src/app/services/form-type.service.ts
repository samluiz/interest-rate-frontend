import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormTypeService {
  constructor() {}

  private subject = new BehaviorSubject<boolean>(false);
  private type!: Observable<unknown>;

  sendType(type: boolean) {
    this.subject.next(type);
  }

  getType(): Observable<any> {
    this.type = new Observable((observer) => {
      observer.next(this.subject.getValue());
      observer.complete();
    });
    return this.type;
  }
}
