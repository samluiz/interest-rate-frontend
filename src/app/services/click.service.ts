import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUUIDService {
  constructor() {}

  private subject = new BehaviorSubject<string>('');
  private uuid!: Observable<unknown>;

  sendClickEvent(uuid: string) {
    this.subject.next(uuid);
  }

  getClickEvent(): Observable<any> {
    this.uuid = new Observable((observer) => {
      observer.next(this.subject.getValue());
      observer.complete();
    });
    return this.uuid;
  }
}
