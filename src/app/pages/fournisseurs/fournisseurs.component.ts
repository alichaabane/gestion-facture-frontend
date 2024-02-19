import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SweetAlertService} from "../../core/services/in-app/sweet-alert.service";
import {FournisseurService} from "../../core/services/http/fournisseur.service";

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrl: './fournisseurs.component.scss'
})
export class FournisseursComponent implements OnInit {

  fournisseurs!: any;
  pageNumber = 0; // Initial page number
  pageSize = 10; // Items per page

  constructor(private fournisseurService: FournisseurService,
              private router: Router,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadFournisseurs(this.pageNumber, this.pageSize);
  }

  loadFournisseurs(pageNumber: number, pageSize: number): void {
    this.fournisseurService.getAllFournisseursPaginated(pageNumber, pageSize).subscribe( (paginatedResponse: any) => {
      if(paginatedResponse) {
        this.fournisseurs = paginatedResponse;
        console.log('fournisseurs = ', this.fournisseurs);
      }
    }, error => {
      this.fournisseurs = null;
      console.log("error fetching fournisseurs ! ");
    })
  }


  addNewFournisseur() {
    // Navigate to the "add-fournisseur" route with "editMode" set to false
    this.router.navigate(['/add-fournisseur', { editMode: false }]);
  }

  editFournisseur(fournisseur, $event: MouseEvent) {
    console.log(fournisseur);
    this.router.navigate(['/add-fournisseur', {id: fournisseur.id, editMode: true }]);
  }

  deleteFournisseur(fournisseur, $event: MouseEvent) {
    console.log('fournisseur to delete = ', fournisseur);
    this.sweetAlertService
      .warning("Voulez vous supprimer ce fournisseur N° " + fournisseur?.id)
      .then(e => {
        if (e.value) {
          this.fournisseurService.deleteFournisseur(fournisseur.id).subscribe(
            (response) => {
              this.loadFournisseurs(this.pageNumber, this.pageSize);
              this.sweetAlertService.success('Fournisseur supprimé avec succés ');
            },
            (error) => {
              console.log('error = ', error);
              this.sweetAlertService.danger('Problème de suppression de fournisseur N° ' + fournisseur.id);
            }
          );
        }
      });
    $event.stopPropagation();

  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadFournisseurs(this.pageNumber, this.pageSize);
  }

}
