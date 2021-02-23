import { Injectable } from '@angular/core';
import { devConfig } from '../../config';
import { prodConfig } from '../../config.prod';
import { stagingConfig } from '../../config.staging';
import constants from '../../constants';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public config: typeof devConfig;
  public constants = constants

  constructor() {
    if (environment.production) {
      this.config = prodConfig;
    }
    else if (environment.staging) {
      this.config = stagingConfig;
    }
    else {
      this.config = devConfig;
    }
  }

}
