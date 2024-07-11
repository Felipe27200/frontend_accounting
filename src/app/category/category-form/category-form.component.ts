import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, output } from '@angular/core';

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
  @Input() category: any;
  /**
   * Let us to emit an event to the parent,
   * so it can handle the rest of the process
   */
  @Output() onSubmit = new EventEmitter<any>();

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
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["category"] === null || changes["category"] === undefined 
        || changes["category"].currentValue === null || changes["category"].currentValue === undefined)
    {
      return;
    }

    this.category = changes["category"].currentValue;

    this.categoryForm.controls.name.setValue(this.category.name);
    this.categoryForm.controls.parentCategory.setValue(this.category.parentCategory);
    this.categoryForm.controls.accountCatalogueId.setValue(this.category.accountCatalogue.id);
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

  validateForm() {
    if (!this.categoryForm.valid)
      return;

    if (!this.name.value)
      this.errors.push("The name can not be empty");

    if (!this.accountCatalogueId.value || typeof(this.accountCatalogueId.value) != "number")
      this.errors.push("That is not a valid account catalogue");

    if ((this.parentCategory.value !== null && this.parentCategory.value !== undefined) && typeof(this.parentCategory.value) != "number")
      this.errors.push("That is not a valid parent category");

    if (this.errors.length > 0)
      return;

    let formData = {
      accountCatalogueId: this.accountCatalogueId.value,
      name: this.name.value, 
      parentCategory: this.parentCategory.value,
    };

    /**
     * This trigger the event to the parent,
     * so, in this way all the process pass
     * to it.
     */
    this.onSubmit.emit(formData);
  }

  get name() { return this.categoryForm.controls.name }
  get parentCategory() { return this.categoryForm.controls.parentCategory }
  get accountCatalogueId() { return this.categoryForm.controls.accountCatalogueId }
}
