import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { CommonResponseService } from '@services/common-response.service';
import { UserService } from '@services/user.service';
import { RoleService } from '@services/role.service';


import { MessageService } from 'primeng/api';
import Role from 'app/interface/role';

@Component({
  selector: 'app-admin-update',
  standalone: false,
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css',
  providers: [ MessageService ]
})
export class AdminUpdateComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);
  
  private responseService: CommonResponseService = inject(CommonResponseService);
  private userService: UserService = inject(UserService);
  private roleService: RoleService = inject(RoleService);

  userId?: number;
  user: any;
  roles: Role[] = []; 

  userForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required]
  });

  ngOnInit(): void 
  {
    this.userId = Number(this.route.snapshot.params['id']);

    if (this.userId === null || this.userId === undefined || this.userId <= 0)
      this.router.navigate(["/admin"]);

    this.userService.getUserById(this.userId)
      .subscribe({
        next: (response: any) => {
          this.user = response;

          this.name?.setValue(this.user.name);
          this.role?.setValue(this.user.role.id);
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });

    this.roleService.getAll()
      .subscribe({
        next: (response: any) => {
          this.roles = response;
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }

      });
  }

  onSubmit()
  {
    if (!this.userForm.valid)
      return;

    let userToUpdate = {
      name: this.name?.value,
      idRole: this.role?.value,
    }

    this.userService.updateUserByAdmin(this.user.id, userToUpdate)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Successful!', detail: 'User was updated' });
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  get name() { return this.userForm.get('name') }
  get role() { return this.userForm.get('role') }
}
