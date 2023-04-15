import { UserModule } from '@frontend/user';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { HttpClientModule } from "@angular/common/http"
import { CategoryService } from "@frontend/product"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
];



@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    DashboardComponent,
    ProductListComponent,
    ProductFormComponent,
    UserListComponent,
    UserFormComponent,
    OrdersListComponent,
    OrdersDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UserModule,
    ...UX_MODULE,
  ],
  providers: [CategoryService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
