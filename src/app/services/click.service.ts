import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUUIDService {
  constructor() {}

  private subject = new BehaviorSubject<string>('');
  private uuid!: Observable<unknown>;

  sendUUID(uuid: string) {
    this.subject.next(uuid);
  }

  getUUID(): Observable<any> {
    this.uuid = new Observable((observer) => {
      observer.next(this.subject.getValue());
      observer.complete();
    });
    return this.uuid;
  }
}
