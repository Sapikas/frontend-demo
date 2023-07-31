import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/diet-agency';
import { UserService } from 'src/app/state/userState/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  schema: any = {
    "type": "object", 
    "title": "Example Form",  
    "required": ["email", "password"],
    "widget": { "formlyConfig": { "validators": { "validation": ["email"] } } }, 
    "properties": {
      "email": { "type": "string",   "title": "Email", "minLength": 3, "maxLength": 30 },
      "password": { "type": "string",   "title": "Password", "minLength": 3, "maxLength": 30 },
    }
  };
  form = new FormGroup({});
  model: any = {};
  isLoginTabActive: boolean = false;
  isSignupTabActive: boolean = true;

  constructor(private userService: UserService, private router: Router) {
   }

  ngOnInit() {
  }

  login() {
    this.isLoginTabActive = true;
    this.isSignupTabActive = false;
  }

  signup() {
    this.isLoginTabActive = false;
    this.isSignupTabActive = true;
  }

  onSubmitHandler(model: any) {
    if (this.isLoginTabActive) {
      const { email, password } = model;
      this.userService.login({ email, password }).subscribe({
        next: (data: LoginResponse) => {
          this.router.navigate(['/agencies']);
        }
      })
    } else if (this.isSignupTabActive) {
      const { email, password } = model;
      this.userService.signup({ email, password }).subscribe({
        complete: () => {
          this.login();
        }
      })
    }
  }
}
