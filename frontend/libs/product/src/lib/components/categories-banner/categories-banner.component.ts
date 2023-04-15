import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [],
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoryService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }
}
