import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '@services/category.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.css'
})
export class CategoryUpdateComponent implements OnInit {
  category!: any;
  selectedId!: number | string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  // switchMap(params => {
  //   this.selectedId = parseInt(params.get("id")!, 10);

  //   this.categoryService.getCategory(this.selectedId)
  //     .subscribe()
  // })

  ngOnInit(): void {
    this.selectedId = parseInt(this.route.snapshot.params["id"]!);

    this.categoryService.getCategory(this.selectedId)
      .subscribe({
        next: (response) => {
          console.dir(response);
        }
      });

    // this.category = this.route.paramMap.pipe(
    //   switchMap(params => {
    //     /**
    //      * El segundo argumento de parseInt() es la base
    //      * númerica a la que se pasara la conversión.
    //      */
    //     this.selectedId = parseInt(params.get("id")!, 10);

    //     return this.crisisService.getCrises();
    // );
  }
}
