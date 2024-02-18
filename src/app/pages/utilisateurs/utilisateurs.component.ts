import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/services/http/user.service";
import {SweetAlertService} from "../../core/services/in-app/sweet-alert.service";

@Component({
  selector: 'app-user',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  users!: any;
  pageNumber = 0; // Initial page number
  pageSize = 10; // Items per page

  constructor(private userService: UserService, private router: Router, private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadUsers(this.pageNumber, this.pageSize);
  }

  loadUsers(pageNumber: number, pageSize: number): void {
    this.userService.getAllUsersPaginated(pageNumber, pageSize).subscribe( (paginatedResponse: any) => {
      if(paginatedResponse) {
        this.users = paginatedResponse;
        console.log('utilisateurs = ', this.users);
      }
    }, error => {
      this.users = null;
      console.log("error fetching users ! ");
    })
  }


  addNewUser() {
    // Navigate to the "add-utilisateur" route with "editMode" set to false
    this.router.navigate(['/add-utilisateur', { editMode: false }]);
  }

  editUser(user, $event: MouseEvent) {
    console.log(user)
    this.router.navigate(['/add-utilisateur', {id: user?.id_user, editMode: true }]);
  }

  deleteUser(user, $event: MouseEvent) {
    console.log('user to delete = ', user);
    this.sweetAlertService
      .warning("Voulez vous supprimer cet utilisateur N° " + user?.cin)
      .then(e => {
        if (e.value) {
          this.userService.deleteUser(user.id_user).subscribe(
            (response) => {
                this.loadUsers(this.pageNumber, this.pageSize);
                this.sweetAlertService.success('Utilisateur supprimé avec succés ');
            },
            (error) => {
              console.log('error = ', error);
              this.sweetAlertService.danger('Problème de suppression de l`utilisateur N° ' + user.cin);
            }
          );
        }
      });
    $event.stopPropagation();

  }

  changeUserStatus(user: any) {
    this.userService.changeUserStatus(user?.id_user).subscribe(
      (response) => {
        user.confirmed = !user.confirmed;
      }
    );
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadUsers(this.pageNumber, this.pageSize);
  }

}
