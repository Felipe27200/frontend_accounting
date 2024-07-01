import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
          label: 'Account',
          icon: 'pi pi-dollar',
          items: [
              {
                  label: 'Register',
                  icon: 'pi pi-plus-circle'
              },
              {
                  label: 'List',
                  icon: 'pi pi-list'
              },
              {
                  label: 'Update',
                  icon: 'pi pi-pencil'
              }
          ]
      },
    ]
  }
}
