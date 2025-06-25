import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-admin-list',
  standalone: false,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit {
  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe({
        next: (response: any) => {
          console.dir(response);
        }
      });
  }
}
