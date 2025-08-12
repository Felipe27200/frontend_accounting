import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CategoryService } from '@services/category.service';
import { CommonResponseService } from '@services/common-response.service';

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrl: './category-create.component.css',
    providers: [MessageService],
    standalone: false
})
export class CategoryCreateComponent {
  enableButton: boolean = true;

  constructor(
    private categoryService: CategoryService,
    private commonResponseService: CommonResponseService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  onSubmit(formData: any)
  {
    this.enableButton = false;

    this.categoryService.createCategory(formData)
    .subscribe({
      next: (response: any) => {
        this.router.navigate(["/categories"]);
      },
      error: (error) => {
        this.messageService.addAll(this.commonResponseService.setToastErrorMessage(error));

        this.enableButton = true;
    }
    });
  }
}
