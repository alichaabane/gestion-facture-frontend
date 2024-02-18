import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from "@angular/router";
import {filter} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../services/http/user.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: any;
  currentRoute: string = null;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.user = this.userService.getUser();
          this.currentRoute = this.route.root.firstChild?.snapshot.routeConfig?.path || null;
          console.log(this.currentRoute)
          if(!this.user  && this.currentRoute != 'login' && this.currentRoute != 'register') {
            this.router.navigate(['/login'])
          } else if (this.user  && (this.currentRoute == '' || this.currentRoute == '/') ) {
            this.router.navigate(['/dashboard'])
          }
        }, 100);
      });

  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isAdmin = this.checkAdmin();
  }

  checkAdmin() {
    return this.user && this.user?.role === 'ADMIN';
  }

  async logout() {
     await this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.userService.removeAllStorage();
    }, 400);

   }



}
