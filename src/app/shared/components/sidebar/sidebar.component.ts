import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../../core/services/http/user.service";

declare interface RouteInfo {
  path: string;
  title: string;
  isAdminPage: boolean;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Tableau de bord', isAdminPage: false, icon: 'business_chart-bar-32', class: ''},
  {path: '/produits', title: 'Liste Produits', isAdminPage: true, icon: 'shopping_basket', class: ''},
  {path: '/fournisseurs', title: 'Liste Fournisseurs', isAdminPage: true, icon: 'shopping_delivery-fast', class: ''},
  // {path: '/generate-facture', title: 'Géneration Factures', isAdminPage: false, icon: 'files_paper', class: ''},
  {path: '/factures', title: 'Liste Factures', isAdminPage: true, icon: 'files_single-copy-04', class: ''},
  {path: '/utilisateurs', title: 'Liste Utilisateurs', isAdminPage: true, icon: 'ft-user-check', class: ''},
  {path: '/login', title: 'Déconnecter', isAdminPage: false, icon: 'media-1_button-power', class: ''},
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isAdminPage: boolean = false;

  constructor(private spinner: NgxSpinnerService, private userService: UserService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userService.isAdmin().then((res: boolean) => {
      this.isAdminPage = res;
    })
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  };

  async logout() {
    console.log('heeere')
    await this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.userService.removeAllStorage();
    }, 1000);

  }

}
