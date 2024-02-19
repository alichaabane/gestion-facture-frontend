import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProduitService} from "../../../core/services/http/produit.service";
import {SweetAlertService} from "../../../core/services/in-app/sweet-alert.service";
import {FournisseurService} from "../../../core/services/http/fournisseur.service";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  editMode: boolean = false;
  produitForm: FormGroup;
  produitId: any;
  produit: any;
  fournisseurs =  [];
  selectedFournisseur = null;
  fournisseurNom = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private produitService: ProduitService,
              private fournisseurService: FournisseurService,
              private sweetAlertService: SweetAlertService,
              private fb: FormBuilder) {
    this.loadFournisseurs();

    this.route.params.subscribe(params => {
      this.editMode = this.route.snapshot.params['editMode'] === 'true';
      if (this.editMode) {
        this.produitId = +params['id'];
      }
    });

  }

  ngOnInit(): void {
    this.initForm();
    if(this.editMode === true && this.produitId) {
      this.produitForm.addControl("id", new FormControl(this.produitId));
      this.loadProduitData(this.produitId);
    } else {
      this.produitForm.addControl("id", new FormControl(null));
      this.produitForm.get('id').enable();
    }
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs().subscribe( (fournisseurs) => {
      this.fournisseurs = fournisseurs;
      if(this.fournisseurs)
        this.selectedFournisseur = this.fournisseurs[0]?.nom;
      console.log('fournisseurs = ', this.fournisseurs);
    }, error => {
      this.fournisseurs = [];
      console.log("error loading fournisseurs   = ", error);
    });
  }

  initForm() {
    this.produitForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      quantiteEnStock: [0, Validators.required],
      prix: [0.0, Validators.required],
      fournisseurId: [this.selectedFournisseur, [Validators.required]], //TODO fournisseur id (select options)
    });
  }

  loadProduitData(produitId: number) {
    // Assuming you have a service to fetch a Produit by its ID
    this.produitService.getProduitById(produitId).subscribe((produit) => {
      if (produit) { // Check if Produit is defined
        console.log('Produit = ', produit);
        this.produit = produit;
        this.selectedFournisseur = this.produit?.fournisseurId;

        // Use the 'patchValue' method to populate the form with existing values
        this.produitForm.patchValue({
          id: this.produitId,
          nom: produit.nom,
          description: produit.description,
          quantiteEnStock: produit.quantiteEnStock,
          prix: produit.prix,
          fournisseurId: produit.fournisseurId,
        });
      } else {
        console.error('Produit not found.');
      }
    });
  }



  createProduit() {
    console.log(this.produitForm.status)
    if (this.produitForm.valid) {
      let produitData = this.produitForm.value;
      console.log(produitData);
      if (!this.editMode) {
        this.produitService.saveProduit(produitData).subscribe(res => {
            console.log('response creating produit = ', res);
            this.sweetAlertService.success('Produit ajouté avec succés');
            setTimeout(() => {
              this.router.navigate(['produits'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un produit : ' + error.status);
            console.log('error creating produit = ', error);
          });
      } else {
        this.produitService.updateProduit(this.produitId, this.produitForm.value).subscribe(res => {
            console.log('response updating produit = ', res);
            this.sweetAlertService.success('Produit modifié avec succés');
            setTimeout(() => {
              this.router.navigate(['produits'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un produit : ' + error.status);
            console.log('error updating produit = ', error);
          });
      }
    } else {
      this.sweetAlertService.notification('Vérifier tous les champs obligatoires !');
    }
  }
}
