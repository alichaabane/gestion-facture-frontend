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

  deleteFournisseur(productId: any): Observable<any> {
    return this.http.delete<any>(`${this.FOURNISSEUR_URL}/${productId}`);
  }

  updateFournisseur(fournisseurId: number, newFournisseur: any): Observable<any> {
    return this.http.put<any>(`${this.FOURNISSEUR_URL}/${fournisseurId}`, newFournisseur);
  }

  saveFournisseur(fournisseur: any) : Observable<any> {
    return this.http.post(`${this.FOURNISSEUR_URL}`, fournisseur);
  }

  getFournisseurById(productId: any): Observable<any> {
    const url = `${this.FOURNISSEUR_URL}/${productId}`;
    return this.http.get(url);
  }

  getTotalFournisseurs(): Observable<number> {
    return this.http.get<number>(`${this.FOURNISSEUR_URL}/count`);
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
