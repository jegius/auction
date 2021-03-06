import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import HomeComponent from './components/home/home.component';
import ProductDetailComponent from './components/product-detail/product-detail.component';
import ApplicationComponent from './components/application/application.component';
import CarouselComponent from './components/carousel/carousel.component';
import FooterComponent from './components/footer/footer.component';
import NavbarComponent from './components/navbar/navbar.component';
import ProductItemComponent from './components/product-item/product-item.component';
import SearchComponent from './components/search/search.component';
import {ProductService} from './services/product.service';
import StarsComponent from './components/stars/stars.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FilterPipe} from './components/pipes/filter-pipe';
import {FormsModule} from '@angular/forms';
import {ONLINE_AUCTION_SERVICES} from './services/services';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'products/:productId',
        component: ProductDetailComponent
      }
    ])],
  declarations: [
    ApplicationComponent,
    CarouselComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductItemComponent,
    SearchComponent,
    StarsComponent,
    FilterPipe],
  providers: [
    ProductService,
    ONLINE_AUCTION_SERVICES,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
  bootstrap: [ApplicationComponent]
})
export class AppModule {
}
