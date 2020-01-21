import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren:
          '@coding-challenge/stocks/feature-shell#StocksFeatureShellModule'
      }
    ]),
    NoopAnimationsModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    StocksDataAccessPriceQueryModule,
    // Import ReactiveFormsModule - for model driven forms. Each form has a state that can be updated by many different interactions
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: StocksAppConfigToken, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule {}
