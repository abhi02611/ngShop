import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import * as UsersActions from '../../state/users.actions';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (user: any) => {
          this.authError = false;
          this.localstorageService.setToken(user.token);
          UsersActions.buildUserSessionSuccess({ user: user.user });
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: `User loggedIn successfully`,
           });
          timer(4000)
            .toPromise()
            .then(() => {
              this.router.navigate(['/']);
            });
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the Server, please try again later!';
          }
        }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
