import {Component, OnInit} from '@angular/core';
import {SweetAlertService} from "../../core/services/in-app/sweet-alert.service";
import {FactureService} from "../../core/services/http/facture.service";
import {ProduitService} from "../../core/services/http/produit.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './generate-facture.component.html',
  styleUrl: './generate-facture.component.scss'
})
export class GenerateFactureComponent implements OnInit {

  factures!: any;
  pageNumber = 0; // Initial page number
  pageSize = 10; // Items per page
  produits!: any;

  selectAllChecked = false;
  factureForm: FormGroup;
  displayedColumns: string[] = ['select', 'nom', 'description', 'fournisseur', 'quantite', 'prix'];
  selectedProduits: { id: number }[] = []; // Array to store selected produits IDs in the desired format

  constructor(private factureService: FactureService,
              private fb: FormBuilder,
              private produitService: ProduitService,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadProduits(this.pageNumber, this.pageSize);

    this.initForm();
  }

  initForm() {
    this.factureForm = this.fb.group({
      nomClient: ['', [Validators.required, Validators.minLength(3)]],
      prenomClient: ['', [Validators.required, Validators.minLength(3)]],
      numTelClient: ['', [Validators.required]],
      adresseClient: ['', [Validators.required]],
      listeProduits: [[], Validators.required]
    });
  }

  loadProduits(pageNumber: number, pageSize: number): void {
    this.produitService.getAllProduitsPaginated(pageNumber, pageSize).subscribe((paginatedResponse: any) => {
      if (paginatedResponse) {
        this.produits = paginatedResponse?.content;
        console.log('produits = ', this.produits);
      }
    }, error => {
      this.produits = null;
      console.log("error fetching produits ! ");
    })
  }


  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadProduits(this.pageNumber, this.pageSize);
  }

  selectAll(event: any) {
    if(event === null || (event && event.checked === -1)){
      this.selectAllChecked = false;
      this.selectedProduits = [];
      this.produits.forEach((produit: any) => (produit.isSelected = this.selectAllChecked));
      this.factureForm.get('listeProduits').setValue([]);

    }
    this.selectAllChecked = event.checked;
    this.produits.forEach((produit: any) => (produit.isSelected = this.selectAllChecked));
    console.log('produits = ', this.produits);
    this.selectedProduits = this.produits.filter((row: any) => row.isSelected)
      .map((selectedRow: any) => ({ id: selectedRow.id }));

    this.factureForm.get('listeProduits').setValue(this.selectedProduits);

    console.log('selectAllChecked = ', this.selectedProduits);
  }

  handleRowSelection(row: any) {
    const index = this.selectedProduits.findIndex((item) => item.id === row.id);

    if (row.isSelected) {
      // If checkbox is checked, add the item to selectedProduits
      if (index === -1) {
        this.selectedProduits.push({ id: row.id });
      }
    } else {
      // If checkbox is unchecked, remove the item from selectedProduits
      if (index !== -1) {
        this.selectedProduits.splice(index, 1);
      }
    }

    this.factureForm.get('listeProduits').setValue(this.selectedProduits);

    // For testing purposes, you can log the selectedProduits array
    console.log('Selected Produits:', this.selectedProduits);
  }

  generateFacture() {
    console.log('factureForm = ', this.factureForm.value);
    if (this.factureForm.valid) {
      let factureData = this.factureForm.value;
      console.log(factureData);
        this.factureService.saveFacture(factureData).subscribe(res => {
            console.log('response creating facture = ', res);
            this.sweetAlertService.success('Facture généré avec succés');
            const blob = new Blob([res], { type: 'application/pdf' });

            // Trigger download
            saveAs(blob, factureData.nomClient+"_"+ factureData.prenomClient+"_"+ Date.now()+'_facture.pdf');
            this.factureForm.reset();
            this.factureForm.markAsUntouched();
            this.factureForm.clearValidators();
            this.factureForm.clearAsyncValidators();
            this.selectAll(null);
            this.selectedProduits = [];
            this.selectAllChecked = false;
          }
          , error => {
            this.sweetAlertService.danger('Problème dans l`ajout d une facture : ' + error.status);
            console.log('error creating facture = ', error);
          });
    } else {
      this.sweetAlertService.notification('Vérifier tous les champs obligatoires !');
    }
  }
}
