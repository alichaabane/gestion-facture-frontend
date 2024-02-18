import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../core/services/http/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";
  show: boolean = false;

  passwordFieldType: string = 'password';
  showPassword: boolean = false;
  confirmPasswordFieldType: string = 'password';
  showConfirmPassword: boolean = false;
  signUpForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router,
              private userService: UserService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.signUpForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      cin: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.min(8)]],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.confirmPasswordFieldType = this.showConfirmPassword ? 'text' : 'password';
  }

  register() {
    if (this.signUpForm.valid) {
      const {confirmPassword, ...formData} = this.signUpForm.value; // dont send confirmpassword
      this.userService.signup(formData).subscribe(
        (res: any) => {
          if (res) {
            console.log('user created successfully = ', res.user);
            this.userService.userData.user = res.user;
            this.userService.userData.token = res.token;
            this.userService.setUser(res.user);
            this.userService.setToken(res.token);
            this.userService.authenticated.next(false);
            this.toastrService.success("Compte crée avec succés !, vous pouvez maintenant contacter votre administrateur pour confirmer !");
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000)
          }
        },
        error => {
          if (error && error.error === 'USER EXISTS') {
            this.toastrService.error('CIN est déja utlisé !');
          } else {
            this.toastrService.error('Erreur de création d\'un nouveau compte ');
          }
          console.log("error during creating of user = ", error);
        }
      );
    }
  }

}
