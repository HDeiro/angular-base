import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {

  private readonly sizesRef = {
    desktop: 1200,
    phone: 650
  };

  public readonly isPhoneView   = new BehaviorSubject<boolean>(false);
  public readonly isTabletView  = new BehaviorSubject<boolean>(false);
  public readonly isDesktopView = new BehaviorSubject<boolean>(false);
  public readonly isMobileView  = new BehaviorSubject<boolean>(false);

  constructor(eventManager: EventManager) {
    let timeoutHandler = null;

    eventManager.addGlobalEventListener('window', 'resize', () => {
      clearTimeout(timeoutHandler);
      timeoutHandler = setTimeout(this.defineSizes.bind(this), 100);
    });

    this.defineSizes();
  }

  private defineSizes(): void {
    this.isPhoneView.next(innerWidth <= this.sizesRef.phone);
    this.isTabletView.next(innerWidth > this.sizesRef.phone && innerWidth < this.sizesRef.desktop);
    this.isDesktopView.next(innerWidth >= this.sizesRef.desktop);
    this.isMobileView.next(innerWidth < this.sizesRef.desktop);
  }
}
