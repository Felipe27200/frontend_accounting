import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-admin-update',
  standalone: false,
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent implements OnInit {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private userService: UserService = inject(UserService);

  userId?: number;
  user: any;

  ngOnInit(): void 
  {
    this.userId = Number(this.route.snapshot.params['id']);

    if (this.userId === null || this.userId === undefined || this.userId <= 0)
      this.router.navigate(["/admin"]);

    this.userService.getUserById(this.userId)
      .subscribe({
        next: (response: any) => {
          console.log(response);
        }
      });
  }
}
