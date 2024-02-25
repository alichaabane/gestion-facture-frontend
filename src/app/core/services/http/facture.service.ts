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
export class FactureService {

  private readonly FACTURE_URL = environment.url + '/facture';


  constructor(private http: HttpClient, private router: Router) { }

  getAllFactures() : Observable<any> {
    return this.http.get(`${this.FACTURE_URL}`);
  }

  deleteFacture(factureId: any): Observable<any> {
    return this.http.delete<any>(`${this.FACTURE_URL}/${factureId}`);
  }

  updateFacture(productId: number, newFacture: any): Observable<any> {
    return this.http.put<any>(`${this.FACTURE_URL}/${productId}`, newFacture);
  }

  saveFacture(facture: any) : Observable<any> {
    return this.http.post(`${this.FACTURE_URL}`, facture, { responseType: 'arraybuffer' });
  }

  getFactureById(productId: any): Observable<any> {
    const url = `${this.FACTURE_URL}/${productId}`;
    return this.http.get(url);
  }

  getTotalFactures(): Observable<number> {
    return this.http.get<number>(`${this.FACTURE_URL}/count`);
  }


  getAllFacturesPaginated(page: number, pageSize: number): Observable<Pagination<any>>  {
    // Set up query parameters for pagination
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    return  this.http.get<Pagination<any>>(`${this.FACTURE_URL}/paginated`, { params }).pipe(
      catchError((error) => {
        console.error('Error loading factures :', error);
        throw error;
      })
    );
  }
}
