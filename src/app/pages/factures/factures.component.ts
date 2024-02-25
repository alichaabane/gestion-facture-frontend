import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SweetAlertService} from "../../core/services/in-app/sweet-alert.service";
import {FactureService} from "../../core/services/http/facture.service";

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.scss'
})
export class FacturesComponent implements OnInit {

  factures!: any;
  pageNumber = 0; // Initial page number
  pageSize = 10; // Items per page

  constructor(private factureService: FactureService,
              private router: Router,
              private sweetAlertService: SweetAlertService) {
  }

  ngOnInit(): void {
    this.loadFactures(this.pageNumber, this.pageSize);
  }

  loadFactures(pageNumber: number, pageSize: number): void {
    this.factureService.getAllFacturesPaginated(pageNumber, pageSize).subscribe( (paginatedResponse: any) => {
      if(paginatedResponse) {
        this.factures = paginatedResponse;
        console.log('factures = ', this.factures);
      }
    }, error => {
      this.factures = null;
      console.log("error fetching factures ! ");
    })
  }

  deleteFacture(facture, $event: MouseEvent) {
    console.log('facture to delete = ', facture);
    this.sweetAlertService
      .warning("Voulez vous supprimer cette facture N° " + facture?.id)
      .then(e => {
        if (e.value) {
          this.factureService.deleteFacture(facture.id).subscribe(
            (response) => {
              this.loadFactures(this.pageNumber, this.pageSize);
              this.sweetAlertService.success('Facture supprimé avec succés ');
            },
            (error) => {
              console.log('error = ', error);
              this.sweetAlertService.danger('Problème de suppression de facture N° ' + facture.id);
            }
          );
        }
      });
    $event.stopPropagation();

  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.loadFactures(this.pageNumber, this.pageSize);
  }

}
