import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CategoryService } from '@services/category.service';
import { CommonResponseService } from '@services/common-response.service';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css',
    providers: [ConfirmationService, MessageService],
    standalone: false
})
export class CategoryListComponent implements OnInit {
  categories!: any[];

  constructor (
    private router: Router,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private responseService: CommonResponseService,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe({
        next: (response: any) => {
          this.categories = response;
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }

  editCategory(id: string | number)
  {
    this.router.navigate([`/categories`, id]);
  }

  dialogDeleteCategory(id: string | number, name: string, event: Event)
  {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete the category: ${name}?`,
      header: 'Delete Category',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.deleteCategory(id);
      },
      reject: () => { }
    });
  }

  deleteCategory(id: string | number)
  {
    this.categoryService.deleteCategory(id)
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: response.body });
          this.ngOnInit();
        },
        error: (error) => {
          this.messageService.addAll(this.responseService.setToastErrorMessage(error));
        }
      });
  }
}
