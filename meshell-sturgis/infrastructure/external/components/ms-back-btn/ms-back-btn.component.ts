import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'ms-back-btn',
  template: `
    <button aria-label="go back" (click)="onClick()">
      <img [attr.src]="cs.config.appRoot + '/assets/images/arrow-left-white.svg'" />
      <span class="back-btn-text" [innerHTML]="text"></span>
    </button>
  `,
  styleUrls: ['./ms-back-btn.component.scss']
})
export class MsBackBtnComponent {

  @Input() routeUrl: string;
  @Input() text = "Back";

  constructor(
    public cs: ConfigService,
    private router: Router,
  ) { }

  onClick() {
    console.log('navigate to', this.routeUrl);
    this.router.navigateByUrl(this.routeUrl);
  }

}
