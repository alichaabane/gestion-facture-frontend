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
export class FournisseurService {

  private readonly FOURNISSEUR_URL = environment.url + '/fournisseurs';


  constructor(private http: HttpClient, private router: Router) { }

  getAllFournisseurs() : Observable<any> {
    return this.http.get(`${this.FOURNISSEUR_URL}`);
  }

  deleteFournisseurs(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.FOURNISSEUR_URL}/${productId}`);
  }

  updateFournisseurs(productId: any): Observable<any> {
    const url = `${this.FOURNISSEUR_URL}/${productId}`;
    return this.http.put<any>(url, productId);
  }

  saveFournisseurs(fournisseur: any) : Observable<any> {
    return this.http.post(`${this.FOURNISSEUR_URL}`, fournisseur);
  }

  getFournisseursById(productId: any): Observable<any> {
    const url = `${this.FOURNISSEUR_URL}/${productId}`;
    return this.http.get(url);
  }


  getAllFournisseursPaginated(page: number, pageSize: number): Observable<Pagination<any>>  {
    // Set up query parameters for pagination
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    return  this.http.get<Pagination<any>>(`${this.FOURNISSEUR_URL}/paginated`, { params }).pipe(
      catchError((error) => {
        console.error('Error loading fournisseurs :', error);
        throw error;
      })
    );
  }
}
