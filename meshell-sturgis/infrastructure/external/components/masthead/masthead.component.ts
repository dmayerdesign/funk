import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'ms-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss']
})
export class MastheadComponent {

  public logoUrl = this.configService.config.appRoot + "/assets/images/meshell-logo.png";

  public rootPath = "/" + this.configService.config.rootPath;

  constructor(
    public configService: ConfigService
  ) { }

}
