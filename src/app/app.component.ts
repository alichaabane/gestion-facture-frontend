import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, interval, startWith, switchMap} from "rxjs";
import {UserService} from "./core/services/http/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, AfterViewInit {
  title = 'gestion-facture';
  currentRoute: string = null;
  location: Location;

  constructor(public router: Router, public route: ActivatedRoute, private userService: UserService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.currentRoute = this.route.root.firstChild?.snapshot.routeConfig?.path || null;
          if(!this.currentRoute) {
            this.router.navigate(['/dashboard']).then();
          }
        }, 0);
      });
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.getCurrentUserWithInterval();
  }

  getCurrentUserWithInterval() {
    if (this.userService.getUser() && this.userService.getToken()) {
      const checkIntervalInMilliseconds = 100000; // each 10 minutes in milliseconds verify is user connected

      interval(checkIntervalInMilliseconds)
        .pipe(
          startWith(0), // Emit immediately on subscription
          switchMap(() => {
            if (this.userService.getUser() && this.userService.getToken()) {
              return this.userService.getCurrentUser();
            } else {
              return [];
            }
          })
        )
        .subscribe(
          (response: any) => {
            const isAuthenticated = response?.confirmed;
            this.userService.authenticated.next(isAuthenticated);
            if (response?.confirmed == false) {
              this.userService.removeAllStorage();
            }
          },
          (error: any) => {
            if (error.status == 500 || error.status == 401) {
              this.userService.removeAllStorage();
            }
            console.log('error loading current user info = ', error);
          }
        );
    }
  }

}
