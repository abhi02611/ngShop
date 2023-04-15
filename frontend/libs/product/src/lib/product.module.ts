import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@frontend/orders';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UiModule } from '@frontend/common-ui'

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [
    OrdersModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProductsSearchComponent,
    ProductItemComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    ProductItemComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
  ],
})
export class ProductModule {}
