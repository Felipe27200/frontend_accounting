import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { CategoryService } from '@services/category.service';
import { ErrorResponse } from 'app/response/error-response';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css',
  /**
   * Angular used it to make available the dependency
   * injection inside this component.
   */
  providers: [MessageService],
})
export class CategoryUpdateComponent implements OnInit {
  category!: any;
  selectedId!: number | string | null;
  error?: ErrorResponse;
  errorToast: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private messageService: MessageService
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
          },
          error: (error) => {
            if (error.status == 404 && error.hasOwnProperty('error'))
            {
                this.error = error.error;
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
          if (error.hasOwnProperty("error") && error.error.hasOwnProperty("message"))
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        }
      });
  }
}
