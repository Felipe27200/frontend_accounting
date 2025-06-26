import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-admin-list',
  standalone: false,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  userList: any[] = [];

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe({
        next: (response: any) => {
          this.userList = response;
        }
      });
  }

  editUser(id: number)
  {
    if (id <= 0)
      return;

    this.router.navigate(["admin/", id]);
  }
}
