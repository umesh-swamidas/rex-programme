// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {StocksAppConfig} from "@coding-challenge/stocks/data-access-app-config";

export const environment: StocksAppConfig = {
  production: false,
  apiKey: 'Tpk_cb788a12066c4676b4a6f74dac0ba44c',
  apiURL: 'https://sandbox.iexapis.com'
};
