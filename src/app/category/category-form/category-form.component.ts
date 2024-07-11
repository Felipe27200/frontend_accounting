import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountCatalogueService } from '@services/account-catalogue.service';
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() title = "";

  accountsCatalogue: any[] = [];
  parentCategoryList: any[] = [];
  errors: any[] = [];
  
  categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    parentCategory: [],
    accountCatalogueId: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountCatalogueService: AccountCatalogueService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

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
    if (!this.categoryForm.valid)
      return;

    if (!this.name.value)
      this.errors.push("The name can not be empty");

    if (!this.accountCatalogueId.value || typeof(this.accountCatalogueId.value) != "number")
      this.errors.push("That is not a valid account catalogue");

    console.log(this.parentCategory.value);

    if ((this.parentCategory.value !== null && this.parentCategory.value !== undefined) && typeof(this.parentCategory.value) != "number")
      this.errors.push("That is not a valid parent category");

    console.dir(this.errors);

    if (this.errors.length > 0)
      return;

    let formData = {
      accountCatalogueId: this.accountCatalogueId.value,
      name: this.name.value, 
      parentCategory: this.parentCategory.value,
    };

    this.categoryService.createCategorie(formData)
      .subscribe({
        next: (response: any) => {
          console.warn(response);

          this.router.navigate(["/categories"]);
        }
      });
  }

  get name() { return this.categoryForm.controls.name }
  get parentCategory() { return this.categoryForm.controls.parentCategory }
  get accountCatalogueId() { return this.categoryForm.controls.accountCatalogueId }
}
