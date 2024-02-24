import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Pagination} from "../../models/Pagination";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly PRODUIT_URL = environment.url + '/produits';


  constructor(private http: HttpClient, private router: Router) { }

  getAllProduits() : Observable<any> {
    return this.http.get(`${this.PRODUIT_URL}`);
  }

  deleteProduit(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.PRODUIT_URL}/${productId}`);
  }

  updateProduit(productId: number, newProduit: any): Observable<any> {
    return this.http.put<any>(`${this.PRODUIT_URL}/${productId}`, newProduit);
  }

  saveProduit(produit: any) : Observable<any> {
    return this.http.post(`${this.PRODUIT_URL}`, produit);
  }

  getProduitById(productId: any): Observable<any> {
    const url = `${this.PRODUIT_URL}/${productId}`;
    return this.http.get(url);
  }

  getTotalProduits(): Observable<number> {
    return this.http.get<number>(`${this.PRODUIT_URL}/count`);
  }

  getAllProduitsPaginated(page: number, pageSize: number): Observable<Pagination<any>>  {
    // Set up query parameters for pagination
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    return  this.http.get<Pagination<any>>(`${this.PRODUIT_URL}/paginated`, { params }).pipe(
      catchError((error) => {
        console.error('Error loading produits :', error);
        throw error;
      })
    );
  }
}
