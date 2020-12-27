import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

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
