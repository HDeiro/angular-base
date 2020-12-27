import { Menu } from './../../models/menu/menu.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MenuService {
  getMenus(): Observable<Menu[]> {
    return of([
      Menu.build({name: 'app.menu.item-1', route: 'home'}),
      Menu.build({name: 'app.menu.item-2', route: 'about'})
    ]);
  }
}
