import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { removeSidebar } from './shared/general.utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isGeneralSidebar: boolean = false;
  isSidebarOverlay: boolean = false;
  isCordova: boolean = false;
  private sidebarSub: Subscription;
  private generalSidebarSub: Subscription;

  constructor(
    private sharedService: SharedService, 
    private platform: Platform) { }

  ngOnInit() {
    this.generalSidebarSub =  this.sharedService.isGeneralSidebarOpenSubject.subscribe((isGeneralSidebarOpen: boolean) => {
      this.isGeneralSidebar = isGeneralSidebarOpen;
      this.isSidebarOverlay = isGeneralSidebarOpen ? true : false;
    });
    if (this.platform.is('cordova')) {
      this.isCordova = true;
    }
  }

  closeSidebar() {
    if (this.isGeneralSidebar) {
      const element = removeSidebar();
      element?.addEventListener('animationend', () => {
        this.sharedService.isGeneralSidebarOpenSubject.next(false);
      });
    }
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
    this.generalSidebarSub.unsubscribe();
  }
}
