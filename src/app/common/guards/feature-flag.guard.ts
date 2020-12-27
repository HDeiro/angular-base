import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const featureFlagName = route?.data?.featureFlag;
    if (featureFlagName && !environment.featureFlags[featureFlagName]) {
      return false;
    }

    return true;
  }
}
