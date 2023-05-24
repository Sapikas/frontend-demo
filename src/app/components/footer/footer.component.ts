import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  public mobileAppBanner: any;
  constructor(private platform: Platform) { }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.mobileAppBanner = false;
    } else {
      this.mobileAppBanner = true;
    }
  }

}
