import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageService } from '@services/local-storage.service';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
          label: 'Account',
          icon: 'pi pi-wallet',
          items: [
              {
                  label: 'Register',
                  icon: 'pi pi-plus-circle'
              },
              {
                  label: 'List',
                  icon: 'pi pi-list'
              }
          ]
      },
      {
          label: 'Category',
          icon: 'pi pi-receipt',
          items: [
              {
                  label: 'Create',
                  icon: 'pi pi-plus-circle',
                  command: () => {
                    this.router.navigate(["/categories/create"]);
                  }
              },
              {
                  label: 'List',
                  icon: 'pi pi-list',
                  command: () => {
                    this.router.navigate(["/categories"]);
                  }
              }
          ]
      },
      {
          label: 'Financial Statement',
          icon: 'pi pi-calculator',
          items: [
              {
                  label: 'Create',
                  icon: 'pi pi-plus-circle',
                  command: () => {
                    this.router.navigate(["/financial-statement/create"]);
                  }
              },
              {
                  label: 'List',
                  icon: 'pi pi-list',
                  command: () => {
                    this.router.navigate(["/financial-statement"]);
                  }
              }
          ]
      },
      {
        label: 'Users',
        icon: 'pi pi-user',
        items: [
          {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {
              this.logout();
            }
          }
        ],
        style: {'margin-left': 'auto'}
      }
    ]
  }

  logout ()
  {
    this.localStorageService.removeItem("Bearer-token");

    this.router.navigate(["/login"]);
  }
}
