import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = false;
  isLoginModalOpen: boolean = false;
  private sidebarSub: Subscription;
  private loginSub: Subscription;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sidebarSub = this.sharedService.isSidebarOpenSubject.subscribe((isSidebarOpen: boolean) => {
      console.log(isSidebarOpen);
      if (!isSidebarOpen) {
        this.isSidebarOpen = false;
      }
    });
    this.loginSub = this.sharedService.isLoginModalOpenSubject.subscribe((isLoginModalOpen: boolean) => {
      if (!isLoginModalOpen) {
        this.isLoginModalOpen = false;
      }
    });
   }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sharedService.isSidebarOpenSubject.next(this.isSidebarOpen);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.sharedService.isSidebarOpenSubject.next(false);
  }

  openLoginModal() {
    this.isLoginModalOpen = true
    this.sharedService.isLoginModalOpenSubject.next(this.isLoginModalOpen);
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

}
