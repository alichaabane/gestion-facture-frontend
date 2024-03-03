import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../core/services/http/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  cin: string = "";
  password: string = "";
  show: boolean = false;

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  updatePassword(token: string, newPassword: string): void {
    this.userService.resetNewPassword(token, newPassword).subscribe(
      (response) => {
        console.log('Password updated:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Password update error:', error);
        // Handle the error as needed
      }
    );
  }

  async forgetPassword() {
    await this.spinner.show();
    if (this.signInForm.valid) {
      console.log(this.signInForm.value.email);
      this.userService.forgetPassword(this.signInForm.value.email).subscribe(
        (res: any) => {
          if (res) {
           console.log("res forget password = ", res);
            this.toastrService.info('Email envoyée a ' + this.signInForm.value.email + ' contenant le mot de passe :) ');
            this.spinner.hide();

          }
        },
          (error: { error: string; }) => {
          this.spinner.hide();
          console.log("error during forget password of user = ", error?.error);
          if (error) {
            console.log(error)
            if (error.error === 'User not found') {
              this.toastrService.error('Utilisateur non trouvé !');
            } else if (error.error === 'User not confirmed') {
              this.toastrService.info('Compte non activé, veuillez contacter l\'administrateur ');
            } else {
              this.toastrService.error('Erreur d\'envoi EMAIL !');
            }
          }
        }
      );
    }
  }

}
