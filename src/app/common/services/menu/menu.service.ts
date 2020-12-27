import { environment } from './../../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Menu } from './../../models/menu/menu.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MenuService {
  getMenus(): Observable<Menu[]> {
    return of([
      Menu.build({name: 'app.menu.item-1', route: 'home', featureFlag: 'home'}),
      Menu.build({name: 'app.menu.item-2', route: 'about', featureFlag: 'about'})
    ]).pipe(
      map(item => item.filter(menu => menu.featureFlag && environment?.featureFlags[menu.featureFlag]))
    );
  }
}
