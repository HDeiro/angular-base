import { environment as environmentProd } from './environments/environment.prod';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

fetch('assets/configurations/settings.json')
  .then(response => response.json())
  .then(({constants, featureFlags}) => {
    environment.constants        = constants;
    environment.featureFlags     = featureFlags;
    environmentProd.constants    = constants;
    environmentProd.featureFlags = featureFlags;
    bootstrapCssOverride();

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(console.error);
  }).catch(console.error);

function bootstrapCssOverride() {
  Object.keys(environment.constants.cssOverride)
    .forEach(css => document.documentElement.style.setProperty(`--${css}`, environment.constants.cssOverride[css]))
}
