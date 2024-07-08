import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountCatalogueService } from '@services/account-catalogue.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent implements OnInit {
  
  accountsCatalogue: any[] = [];
  categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    parentCategory: [this.accountsCatalogue],
    accountCatalogueId: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountCatalogueService: AccountCatalogueService
  ) {}

  ngOnInit(): void {
    this.accountCatalogueService.getAccountsCatalogue()
      .subscribe({
        next: (response: any) => {
          this.accountsCatalogue = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  onSubmit() {

  }

  get name() { return this.formBuilder.control.name }
}
