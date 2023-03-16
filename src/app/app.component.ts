import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = false;
  isLoginModalOpen: boolean = false;
  isGeneralSidebar: boolean = false;
  isSidebarOverlay: boolean = false;
  private sidebarSub: Subscription;
  private loginSub: Subscription;
  private generalSidebarSub: Subscription;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sidebarSub = this.sharedService.isSidebarOpenSubject.subscribe(isSidebarOpen => {
      this.isSidebarOpen = isSidebarOpen;
      this.isSidebarOverlay = isSidebarOpen ? true : false;
    });
    this.loginSub = this.sharedService.isLoginModalOpenSubject.subscribe((isLoginModalOpen: boolean) => {
      this.isLoginModalOpen = isLoginModalOpen;
      this.isSidebarOverlay = isLoginModalOpen ? true : false;
    });
    this.generalSidebarSub =  this.sharedService.isGeneralSidebarOpenSubject.subscribe((isGeneralSidebarOpen: boolean) => {
      this.isGeneralSidebar = isGeneralSidebarOpen;
      this.isSidebarOverlay = isGeneralSidebarOpen ? true : false;
    })
  }

  closeSidebar() {
    if (this.isSidebarOpen) {
      this.sharedService.isSidebarOpenSubject.next(false);
    } else if (this.isLoginModalOpen) {
      this.sharedService.isLoginModalOpenSubject.next(false);
    } else if (this.isGeneralSidebar) {
      this.sharedService.isGeneralSidebarOpenSubject.next(false);
    }
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
    this.loginSub.unsubscribe();
    this.generalSidebarSub.unsubscribe();
  }
}
