import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@services/user.service';
import { CommonResponseService } from '@services/common-response.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-list',
  standalone: false,
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
  providers: [MessageService]
})
export class AdminListComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private responseService: CommonResponseService = inject(CommonResponseService);
  private messageService: MessageService = inject(MessageService);

  userList: any[] = [];

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe({
        next: (response: any) => {
          this.userList = response;
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
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
