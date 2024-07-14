import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '@services/category.service';

import { ErrorResponse } from 'app/response/error-response';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent implements OnInit {
  category!: any;
  selectedId!: number | string | null;
  categoryExist: boolean = false;
  error?: ErrorResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedId = this.route.snapshot.paramMap.get("id");
    })

    if (this.selectedId === null || this.selectedId === undefined || this.selectedId === "")
      this.router.navigate(["/categories"]);

    if (isNaN(Number(this.selectedId)))
      this.router.navigate(["/categories"]);
    else
    {
      this.categoryService.getCategory(this.selectedId)
        .subscribe({
          next: (response) => {
            this.category = response;
            this.categoryExist = true; 
          },
          error: (error) => {
            if (error.status == 404)
            {
              if (error.hasOwnProperty('error'))
                this.error = error.error;

                console.log(this.error)
            }
          }
        });
    }
  }

  onSubmit(formData: any)
  {
    this.categoryService.updateCategory(formData, this.selectedId!)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(["/categories"]);
        },
        error: (error) => {
          console.dir(error);
        }
      });
  }
}
