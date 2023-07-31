import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { UserQuery } from 'src/app/state/userState/user.query';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isLoginModalOpen: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private modalCtrl: ModalController, 
    private helperService: SharedService,
    private userQuery: UserQuery) { }

  ngOnInit() {
    this.userQuery.sessionId$.subscribe(res => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
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

}
