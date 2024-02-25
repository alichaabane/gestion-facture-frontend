import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SweetAlertService} from "../../../core/services/in-app/sweet-alert.service";
import {FournisseurService} from "../../../core/services/http/fournisseur.service";

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
  editMode: boolean = false;
  fournisseurForm: FormGroup;
  fournisseurId: any;
  fournisseur: any;
  fournisseurs =  [];
  selectedFournisseur = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fournisseurService: FournisseurService,
              private sweetAlertService: SweetAlertService,
              private fb: FormBuilder) {
    this.loadFournisseurs();

    this.route.params.subscribe(params => {
      this.editMode = this.route.snapshot.params['editMode'] === 'true';
      if (this.editMode) {
        this.fournisseurId = +params['id'];
      }
    });

  }

  ngOnInit(): void {
    this.initForm();
    if(this.editMode === true && this.fournisseurId) {
      this.fournisseurForm.addControl("id", new FormControl(this.fournisseurId));
      this.loadFournisseurData(this.fournisseurId);
    } else {
      this.fournisseurForm.addControl("id", new FormControl(null));
      this.fournisseurForm.get('id').enable();
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
    this.fournisseurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[\u0600-\u06FFa-zA-Z0-9 ]+$')]],
      adresse: ['', [Validators.required]],
      contact: ['', Validators.required],
    });
  }

  loadFournisseurData(fournisseurId: number) {
    // Assuming you have a service to fetch a Fournisseur by its ID
    this.fournisseurService.getFournisseurById(fournisseurId).subscribe((fournisseur) => {
      if (fournisseur) { // Check if Fournisseur is defined
        console.log('Fournisseur = ', fournisseur);
        this.fournisseur = fournisseur;
        this.selectedFournisseur = this.fournisseur?.fournisseurId;

        // Use the 'patchValue' method to populate the form with existing values
        this.fournisseurForm.patchValue({
          nom: fournisseur.nom,
          adresse: fournisseur.adresse,
          contact: fournisseur.contact,
        });
      } else {
        console.error('Fournisseur not found.');
      }
    });
  }



  createFournisseur() {
    console.log(this.fournisseurForm.status)
    if (this.fournisseurForm.valid) {
      let fournisseurData = this.fournisseurForm.value;
      console.log(fournisseurData);
      if (!this.editMode) {
        this.fournisseurService.saveFournisseur(fournisseurData).subscribe(res => {
            console.log('response creating fournisseur = ', res);
            this.sweetAlertService.success('Fournisseur ajouté avec succés');
            setTimeout(() => {
              this.router.navigate(['fournisseurs'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un fournisseur : ' + error.status);
            console.log('error creating fournisseur = ', error);
          });
      } else {
        this.fournisseurService.updateFournisseur(this.fournisseurId, this.fournisseurForm.value).subscribe(res => {
            console.log('response updating fournisseur = ', res);
            this.sweetAlertService.success('Fournisseur modifié avec succés');
            setTimeout(() => {
              this.router.navigate(['fournisseurs'])
            }, 1000)
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d un fournisseur : ' + error.status);
            console.log('error updating fournisseur = ', error);
          });
      }
    } else {
      this.sweetAlertService.notification('Vérifier tous les champs obligatoires !');
    }
  }
}
