import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Subscription } from 'rxjs';
import { AnimationController, ModalController, Platform } from '@ionic/angular';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

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
  isCordova: boolean = false;
  private sidebarSub: Subscription;
  private generalSidebarSub: Subscription;

  constructor(
    private sharedService: SharedService, 
    private modalCtrl: ModalController, 
    private animationCtrl: AnimationController,
    private platform: Platform) { }

  ngOnInit() {
    this.sidebarSub = this.sharedService.isSidebarOpenSubject.subscribe(isSidebarOpen => {
      this.isSidebarOpen = isSidebarOpen;
      this.isSidebarOverlay = isSidebarOpen ? true : false;
    });
    this.generalSidebarSub =  this.sharedService.isGeneralSidebarOpenSubject.subscribe((isGeneralSidebarOpen: boolean) => {
      this.isGeneralSidebar = isGeneralSidebarOpen;
      this.isSidebarOverlay = isGeneralSidebarOpen ? true : false;
    });
    if (this.platform.is('cordova')) {
      this.isCordova = true;
    }
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

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      animated: true,
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation
    });
    modal.present();
  }

  ngOnDestroy() {
    this.sidebarSub.unsubscribe();
    this.generalSidebarSub.unsubscribe();
  }
}
