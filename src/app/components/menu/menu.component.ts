import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ModalController } from '@ionic/angular';
import { UserQuery } from 'src/app/state/userState/user.query';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isLoginModalOpen: boolean = false;
  private sidebarSub: Subscription;
  isLoggedIn: boolean = false;

  constructor(
    private modalCtrl: ModalController, 
    private helperService: SharedService,
    private userQuery: UserQuery) { }

  ngOnInit() {
    this.userQuery.sessionId$.subscribe(res => {
      this.isLoggedIn = res ? true : false;
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      animated: true,
      enterAnimation: this.helperService.enterAnimation,
      leaveAnimation: this.helperService.leaveAnimation
    });
    modal.present();
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
  }

}
