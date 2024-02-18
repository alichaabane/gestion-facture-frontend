import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Pagination} from "../../models/Pagination";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly AUTH_URL = environment.url + '/auth';
  private readonly USER_URL = environment.url + '/user';

  public authenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.authenticated.asObservable();
  public userData: any = {
    token: null,
    user: null
  }

  constructor(private http: HttpClient, private router: Router) { }

  signin(userData: any) : Observable<any> {
    return this.http.post(`${this.AUTH_URL}/login`, userData);
  }

  signup(userData: any) : Observable<any> {
    return this.http.post(`${this.AUTH_URL}/register`, userData);
  }

  addUser(userData: any) : Observable<any> {
    return this.http.post(`${this.USER_URL}/add`, userData);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.AUTH_URL}/current`);
  }

  fetchUsers() : Observable<any> {
    return this.http.get(`${this.USER_URL}/all`);
  }

 getAllUsersPaginated(page: number, pageSize: number): Observable<Pagination<any>>  {
   // Set up query parameters for pagination
   const params = new HttpParams()
     .set('page', page.toString())
     .set('size', pageSize.toString());

   return  this.http.get<Pagination<any>>(`${this.USER_URL}/paginated`, { params }).pipe(
     catchError((error) => {
       // Handle errors here, e.g., log or show an error message
       console.error('Error loading users :', error);
       throw error; // Rethrow the error to propagate it to the component
     })
   );
  }

  changeUserStatus(id: any) {
    return this.http.put(`${this.USER_URL}/active/${id}`, {}, {observe: 'response'});
  }

  updateUser(userData: any): Observable<any> {
    const url = `${this.USER_URL}/edit`;
    return this.http.put<any>(url, userData);

  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.USER_URL}/${id}`);
  }

  getUserById(responsableId: number): Observable<any> {
    const url = `${this.USER_URL}/${responsableId}`;
    return this.http.get(url);
  }

  // Local storage token / user

  public setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  public getToken(): any | null {
    return localStorage.getItem('token');
  }

  public async isAdmin() {
    const user = await this.getUser();
    return user?.role === 'SUPER_ADMIN';
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public removeUser(): void {
    localStorage.removeItem('user');
  }

  public removeAllStorage(): void {
      this.removeToken();
      this.removeUser();
      this.authenticated.next(false);
      this.router.navigate(['/login']);
  }


  public get isUserAuthenticated(): boolean {
    return this.authenticated.getValue();
  }

}
