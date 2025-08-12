import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from '@services/local-storage.service';
import { UserService } from '@services/user.service';
import { jwtDecode } from 'jwt-decode';

import { MenuItem } from 'primeng/api';
import { CustomToken } from 'app/interface/custom-token';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
    standalone: false
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor (
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let tokenStorage = this.localStorageService.getItem("Bearer-token");

    if (tokenStorage == null || tokenStorage == undefined
       || tokenStorage == "" || typeof tokenStorage !== "string")
    {
      this.logout();
      return;
    }

    let token: string = tokenStorage;
    const decoded = jwtDecode<CustomToken>(token);

    this.items = [
      {
          label: 'Account',
          icon: 'pi pi-wallet',
          command: () => {
            this.router.navigate(["/accounts"]);
          }
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
      }
    ];

    if (this.userService.isAdmin())
    {
      this.items.push({
        label: 'Administration',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => {
              this.router.navigate(["/admin"]);
            }
          },
        ]
      });
    }

    this.items.push({
        label: decoded.sub,
        icon: 'pi pi-user',
        items: [
          {
            label: "Settings",
            icon: "pi pi-cog",
            command: () => {
              this.router.navigate(["/user-config"]);
            }
          },
          {
            label: "Change Password",
            icon: "pi pi-key",
            command: () => {
              this.router.navigate(["/user-config/change-password"]);
            }
          },
          {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {
              this.logout();
            }
          },
        ],
        style: {'margin-left': 'auto', 'margin-right': '60px'}
      });
  }

  logout ()
  {
    this.localStorageService.removeItem("Bearer-token");

    this.router.navigate(["/login"]);
  }
}
