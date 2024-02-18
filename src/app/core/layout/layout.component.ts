import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/service/http/user.service";
import {ActivatedRoute, NavigationEnd, Route, Router} from "@angular/router";
import {filter} from "rxjs";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: any;
  currentRoute = null;
  canSee: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UserService, private authService: SocialAuthService,
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
            this.router.navigate(['/actualite-mgm'])
          }
        }, 100);
      });

  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.canSee = this.checkEligibleToSeePage();
    this.isAdmin = this.checkAdmin();
  }

  checkEligibleToSeePage() {
    return this.user && (this.user?.regionResponsableId !== null || (this.user?.role === 'SUPER_ADMIN' ));
  }

  checkAdmin() {
    return this.user && this.user?.role === 'SUPER_ADMIN';
  }

  async logout() {
     await this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.userService.removeAllStorage();
      this.signOut();
    }, 400);

   }
  async signOut() {
    await this.authService.signOut(true);
  }


}
