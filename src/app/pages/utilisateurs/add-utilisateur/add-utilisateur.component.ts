import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/http/user.service";
import {SweetAlertService} from "../../../core/services/in-app/sweet-alert.service";

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.scss']
})
export class AddUtilisateurComponent implements OnInit {
  editMode: boolean = false;
  userForm: FormGroup;
  userId: any;
  passwordFieldType: string = 'password';
  showPassword: boolean = false;
  user: any;
  roles =  ['ADMIN', 'UTILISATEUR'];
  selectedRole = 'UTILISATEUR';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private sweetAlertService: SweetAlertService,
              private fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.editMode = this.route.snapshot.params['editMode'] === 'true';
      if (this.editMode) {
        this.userId = +params['id'];
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    if(this.editMode === true && this.userId) {
      this.userForm.addControl("id_user", new FormControl(this.userId));
      this.loadUserData(this.userId);
    } else {
      this.userForm.addControl("cin", new FormControl(null));
      this.userForm.get('password').setValidators(Validators.required)
      this.userForm.get('cin').enable();
    }
  }

  initForm() {
    this.userForm = this.fb.group({
      cin: [null, [Validators.required]],
      nom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      password: ['', [Validators.minLength(4)]],
      age: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.min(8)]],
      email: ['', [Validators.required, Validators.email]],
      role: [this.selectedRole, [Validators.required]],
    });
  }

  loadUserData(userId: number) {
    // Assuming you have a service to fetch a User by its ID
    this.userService.getUserById(userId).subscribe((user) => {
      if (user) { // Check if User is defined
        console.log('User = ', user);
        this.user = user;
        this.selectedRole = this.user?.role;

        // Use the 'patchValue' method to populate the form with existing values
        this.userForm.patchValue({
          id_user: this.userId,
          cin: user.cin,
          nom: user.nom,
          prenom: user.prenom,
          age: user.age,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
          password: null
        });
      } else {
        console.error('User not found.');
      }
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  createUser() {
    if (this.userForm.valid) {
      let userData = this.userForm.value;
      console.log(userData);
      if (!this.editMode) {
        this.userService.signup(userData).subscribe(res => {
            console.log('response creating user = ', res);
            this.sweetAlertService.success('Utilisateur ajouté avec succés');
            setTimeout(() => {
              this.router.navigate(['utilisateurs'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un utilisateur : ' + error.status);
            console.log('error creating user = ', error);
          });
      } else {
        this.userService.updateUser(this.userForm.value).subscribe(res => {
            console.log('response updating user = ', res);
            this.sweetAlertService.success('Utilisateur modifié avec succés');
            setTimeout(() => {
              this.router.navigate(['utilisateurs'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un utilisateur : ' + error.status);
            console.log('error updating user = ', error);
          });
      }
    } else {
      this.sweetAlertService.notification('Vérifier tous les champs obligatoires !');
    }
  }
}
