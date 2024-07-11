import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

// Services
import { CategoryService } from '@services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories!: any[];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe({
        next: (response: any) => {
          this.categories = response;
          console.log(response);
        },
        error: (error) => {
          console.warn(error);
        }
      });
  }

  editCategory(id: string | number)
  {
    this.router.navigate([`/categories`, id]);
  }
}
