import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../core/services/http/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  show: boolean = false;

  passwordFieldType: string = 'password';
  showPassword: boolean = false;
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      cin: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)],]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  async login() {
    await this.spinner.show();
    if (this.signInForm.valid) {
      this.userService.signin(this.signInForm.value).subscribe(
        (res: any) => {
          if (res) {
            setTimeout(() => {
              console.log('user logged successfully = ', res.user);
              this.userService.userData.user = res.user;
              this.userService.userData.token = res.token;
              this.userService.setUser(res.user);
              this.userService.setToken(res.token);
              if (res.user && res.user.confirmed === true) {
                this.userService.authenticated.next(true);
                this.spinner.hide();
                this.router.navigate(['/home']);
                this.toastrService.success('<span class="me-2">' + this.userService.getUser()?.username + '</span>' + 'Bienvenue Cher(e) ');
              } else {
                this.spinner.hide();
                this.userService.authenticated.next(false);
                this.toastrService.info('Compte non activé, veuillez contacter l\'administrateur !');
              }
            }, 1000)
          }
        },
          (error: { error: string; }) => {
          this.spinner.hide();
          console.log("error during sign in of user = ", error?.error);
          if (error) {
            console.log(error)
            if (error.error === 'User not found') {
              this.toastrService.error('Utilisateur non trouvé !');
            } else if (error.error === 'Invalid username or password') {
              this.toastrService.error('Vérifier vos coordonnées SVP !');
            } else if (error.error === 'User not confirmed') {
              this.toastrService.info('Compte non activé, veuillez contacter l\'administrateur ');
            } else {
              this.toastrService.error('Vérifier vos coordonnées SVP !');
            }
          }
        }
      );
    }
  }

}
