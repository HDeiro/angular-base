import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubsubService {

  private readonly publishers: any = {};

  public emit(event: string, payload: any = null): void {
    this.initEvent(event);
    this.publishers[event].next(payload);
  }

  public get(event: string): Subject<any> {
    return this.initEvent(event);
  }

  public emitAsBehaviorSubject(event: string, payload: any): void {
    this.initEvent(event, true, payload);
    this.publishers[event].next(payload);
  }

  public getAsBehaviorSubject(event: string): Subject<any> {
    return this.initEvent(event, true);
  }

  private initEvent(event: string, isBehaviorSubject = false, initialBehaviorSubjectValue = null): Subject<any> | BehaviorSubject<any> {
    if (!this.publishers[event]) {
      this.publishers[event] = isBehaviorSubject ? new Subject<any>() : new BehaviorSubject<any>(null);
    }
    return this.publishers[event];
  }
}
