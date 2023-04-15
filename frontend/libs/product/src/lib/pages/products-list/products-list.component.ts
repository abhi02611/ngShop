import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { ProductsService } from '../../service/products.service';
import { CategoryService } from '../../service/category.service';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private prodService: ProductsService,
    private catService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category['_id']);

    this._getProducts(selectedCategories);
  }
}
