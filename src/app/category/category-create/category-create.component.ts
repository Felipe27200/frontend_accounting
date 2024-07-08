import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountCatalogueService } from '@services/account-catalogue.service';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit {
  
  accountsCatalogue: any[] = [];
  parentCategoryList: any[] = [];
  
  categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    parentCategory: [],
    accountCatalogueId: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountCatalogueService: AccountCatalogueService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.accountCatalogueService.getAccountsCatalogue()
      .subscribe({
        next: (response: any) => {
          this.accountsCatalogue = response;
        },
        error: (error) => {
          console.error(error);
        }
      });

    this.categoryService.getCategories()
      .subscribe({
        next: (response: any) => {
          this.parentCategoryList = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSubmit() {

  }

  get name() { return this.categoryForm.controls.name }
  get parentCategory() { return this.categoryForm.controls.parentCategory }
  get accountCatalogueId() { return this.categoryForm.controls.accountCatalogueId }
}
