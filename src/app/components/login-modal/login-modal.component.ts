import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/state/userState/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  @ViewChild('loginDiv') loginDiv: ElementRef;
  @ViewChild('signupDiv') signupDiv: ElementRef;
  @ViewChild('loginForm') signedUpForm: NgForm;
  loginActive = true;
  signupActive = false;
  submitText = 'Κάνε σύνδεση';
  authSub: Subscription;

  constructor(
    private userService: UserService, 
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  toggleActive(div: HTMLDivElement) {
    if (div === this.loginDiv.nativeElement) {
      this.loginActive = true;
      this.signupActive = false;
      this.submitText = 'Κάνε σύνδεση';
    } else if (div === this.signupDiv.nativeElement) {
      this.loginActive = false;
      this.signupActive = true;
      this.submitText = 'Εγγραφή';
    }
  }

  onSubmit() {
    this.authSub = this.userService.login(this.signedUpForm.value).subscribe(
      () => {
        this.modalCtrl.dismiss(null, 'cancel');
        this.router.navigate(['/home']);
      }
    );
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

}
