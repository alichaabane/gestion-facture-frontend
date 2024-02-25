import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SweetAlertService} from "../../core/services/in-app/sweet-alert.service";
import {ProduitService} from "../../core/services/http/produit.service";
import {FournisseurService} from "../../core/services/http/fournisseur.service";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss'
})
export class ProduitsComponent implements OnInit {

  produits!: any;
  fournisseur!: any;
  pageNumber = 0; // Initial page number
  pageSize = 10; // Items per page

  constructor(private produitService: ProduitService,
              private fournisseurService: FournisseurService,
              private router: Router,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadProduits(this.pageNumber, this.pageSize);
  }

  loadProduits(pageNumber: number, pageSize: number): void {
    this.produitService.getAllProduitsPaginated(pageNumber, pageSize).subscribe( (paginatedResponse: any) => {
      if(paginatedResponse) {
        this.produits = paginatedResponse;
        console.log('produits = ', this.produits);
      }
    }, error => {
      this.produits = null;
      console.log("error fetching produits ! ");
    })
  }


  addNewProduit() {
    // Navigate to the "add-facture" route with "editMode" set to false
    this.router.navigate(['/add-produit', { editMode: false }]);
  }

  editProduit(produit, $event: MouseEvent) {
    console.log(produit);
    this.router.navigate(['/add-produit', {id: produit.id, editMode: true }]);
  }

  deleteProduit(produit, $event: MouseEvent) {
    console.log('produit to delete = ', produit);
    this.sweetAlertService
      .warning("Voulez vous supprimer ce produit N° " + produit?.id)
      .then(e => {
        if (e.value) {
          this.produitService.deleteProduit(produit.id).subscribe(
            (response) => {
              this.loadProduits(this.pageNumber, this.pageSize);
              this.sweetAlertService.success('Produit supprimé avec succés ');
            },
            (error) => {
              console.log('error = ', error);
              this.sweetAlertService.danger('Problème de suppression de produit N° ' + produit.id);
            }
          );
        }
      });
    $event.stopPropagation();

  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadProduits(this.pageNumber, this.pageSize);
  }

}
