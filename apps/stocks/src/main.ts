import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
});

/*
* Candidate's comments:
* Some of the good things observed here:
* 1. Separate apps for front-end and backend applications.
* 2. Rather than trying to overload the main apps, the logic is divided between components in the lib and then loaded in the app module.
* 3. Usage of @ngrx/store . Rather than relying on services, comprehensive usage of store can be seen.
*
* Some of the improvements/issues observed:
* 1. The test cases were failing mainly because of missing imports and providers for dependency injection. (Refer to the changed files in the PR)
* 2. Subscriptions were not being removed upon component destruction.
* 3. There was a bug in chart.component.html due to which the chart itself was not loading.
* */
