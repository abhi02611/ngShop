import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PeoductListComponent } from './pages/product-list/peoduct-list.component';
import { NavComponent } from './shared/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductModule } from "@frontend/product";
import { AccordionModule } from 'primeng/accordion';
import { UiModule } from '@frontend/common-ui';
import { OrdersModule } from '@frontend/orders';
import { UserModule, JwtInterceptor } from '@frontend/user';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PeoductListComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AccordionModule,
    OrdersModule,
    UiModule,
    UserModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
