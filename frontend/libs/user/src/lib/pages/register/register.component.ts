import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { PasswordValidator } from '../../services/password-validator.service';

@Component({
  selector: 'user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentUserId: string;
  countries = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidator.patternValidator(new RegExp('(?=.*[0-9])'), {
              requiresDigit: true,
            }),
            PasswordValidator.patternValidator(new RegExp('(?=.*[A-Z])'), {
              requiresUppercase: true,
            }),
            PasswordValidator.patternValidator(new RegExp('(?=.*[a-z])'), {
              requiresLowercase: true,
            }),
            PasswordValidator.patternValidator(new RegExp('(?=.*[$@^!%*?&])'), {
              requiresSpecialChars: true,
            }),
          ],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        isAdmin: [false],
        street: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        apartment: ['', Validators.required],
        apartment2: [''],
        zip: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$')]],
        city: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        country: ['', Validators.required],
      },
      {
        validators: PasswordValidator.MatchValidator,
      }
    );
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      }
    );
  }


  onSubmit() {
    console.log(this.userForm);

    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      password: this.userForm.password.value,
    };
      this._addUser(user);
  }

  onCancle() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }
}
