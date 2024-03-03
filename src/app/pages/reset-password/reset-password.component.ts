// reset-password.component.ts

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../core/services/http/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  resetForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
    this.initForm();
  }

  initForm() {
    this.resetForm = this.fb.group({
      newPassword: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  async updatePassword() {
    // Add validation for newPassword if needed
    await this.spinner.show();
    this.userService.resetNewPassword(this.token, this.resetForm.value.newPassword).subscribe(
      (response) => {
        console.log('Password updated:', response);
        this.toastrService.info('Votre mot de passe est mise à jour :) ');
        this.spinner.hide();
        this.router.navigate(['/login']).then();
      },
      (error) => {
        this.spinner.hide();
        if (error) {
          console.log(error)
          if (error.status === 400) {
            this.toastrService.error('Le lien de réinitialisation de mot de passe est expiré ou invalide.');
            this.router.navigate(['/login']).then();
          } else {
            this.toastrService.error('Erreur de mise à jour de votre mot de passe ');
          }
        }
      }
    );
  }
}
