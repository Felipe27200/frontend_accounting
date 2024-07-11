import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
  )
  {}
  onSubmit(formData: any)
  {
    this.categoryService.createCategory(formData)
    .subscribe({
      next: (response: any) => {
        console.warn(response);

        this.router.navigate(["/categories"]);
      }
    });
  }
}
