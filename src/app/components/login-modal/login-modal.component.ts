import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
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

  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) { }

  ngOnInit() {}

  closeModal() {
    this.sharedService.isLoginModalOpenSubject.next(false);
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
        this.sharedService.isLoginModalOpenSubject.next(false);
        this.router.navigate(['/home']);
      }, (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

}
