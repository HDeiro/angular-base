import { Menu } from './common/models/menu/menu.model';
import { MenuService } from './common/services/menu/menu.service';
import { PubsubService } from './common/services/pubsub/pubsub.service';
import { Emitters } from './common/services/pubsub/pubsub-emitters';
import { UserAgentService } from './common/services/user-agent/user-agent.service';
import { ViewStateService } from './common/services/view-state/view-state.service';
import { environment } from './../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ MenuService ]
})
export class AppComponent implements OnInit, OnDestroy {

  public menus: Menu[];
  public isMobile: boolean;
  public logos = {
    forMenu:   environment?.constants?.logo?.forMenu,
    forHeader: environment?.constants?.logo?.forHeader
  }

  private bodyRef: HTMLBodyElement      = document.querySelector('body');
  private subscriptions: Subscription[] = [];

  constructor(
    private translate: TranslateService,
    private viewState: ViewStateService,
    private userAgent: UserAgentService,
    private pubsub: PubsubService,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.setupLanguage();
    this.setupUserAgentHandling();
    this.setupViewStateHandling();
    this.startGlobalListeners();
    this.initMenus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initMenus() {
    this.subscriptions.push(
      this.menuService
        .getMenus()
        .subscribe(menus => this.menus = menus)
    );
  }

  private changeLanguage(language: string) {
    language = (language || '').toLowerCase();
    if (environment.constants.language.supported.some(supported => supported === language)) {
      this.translate.use(language);
    }
  }

  private setupLanguage() {
    const {language} = window.navigator;
    this.translate.setDefaultLang(environment.constants.language.default);
    this.changeLanguage(language);
  }

  private setupUserAgentHandling() {
    if (this.userAgent.isAndroid()) {
      this.changeBodyClasses('is-android', true);
    }

    if (this.userAgent.isIE()) {
      this.changeBodyClasses('is-ie', true);
    }

    if (this.userAgent.isEdge()) {
      this.changeBodyClasses('is-edge', true);
    }

    if (this.userAgent.isSafari()) {
      this.changeBodyClasses('is-safari', true);
    }

    if (this.userAgent.isIOS() || this.userAgent.isChromeIOS()) {
      this.changeBodyClasses('is-ios', true);
    }

    if (this.userAgent.isChrome()) {
      this.changeBodyClasses('is-chrome', true);
    }

    if (this.userAgent.isFirefox()) {
      this.changeBodyClasses('is-firefox', true);
    }
  }

  private setupViewStateHandling() {
    this.subscriptions.push(
      this.viewState.isDesktopView.subscribe(is => this.changeBodyClasses('is-desktop', is)),
      this.viewState.isTabletView.subscribe(is => this.changeBodyClasses('is-tablet', is)),
      this.viewState.isPhoneView.subscribe(is => this.changeBodyClasses('is-phone', is)),
      this.viewState.isMobileView.subscribe(is => {
        this.isMobile = is;
        this.changeBodyClasses('is-mobile', is);
        // Just because of the assignment of isMobile. To avoid errors in console when start from mobile.
        this.cdr.detectChanges();
      })
    );
  }

  private changeBodyClasses(clazz: string, activate: boolean) {
    this.bodyRef.classList[activate ? 'add' : 'remove'](clazz);
  }

  private startGlobalListeners() {
    this.subscriptions.push(
      this.pubsub
        .get(Emitters.CHANGE_LANGUAGE)
        .pipe(filter(Boolean))
        .subscribe(this.changeLanguage.bind(this))
    )
  }
}
