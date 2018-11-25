import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Product, ProductService} from '../../services/product.service';
import {debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auction-home-page',
  styleUrls: ['home.component.css'],
  template: `
    <div class="row carousel-holder">
      <div class="col-md-12">
        <app-auction-carousel></app-auction-carousel>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group"><input placeholder="Filter products by title" class="form-control" type="text" [formControl]="titleFilter">
        </div>
      </div>
    </div>
    <div class="row">
      <div *ngFor="let product of products | async | filter:'title':filterCriteria" class="col-sm-4 col-lg-4 col-md-4">
        <app-auction-product-item [product]="product"></app-auction-product-item>
      </div>
    </div>    `
})
export default class HomeComponent {
  products: Observable<Product[]>;
  titleFilter: FormControl = new FormControl();
  filterCriteria: string;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
    this.titleFilter.valueChanges
      .pipe(debounceTime(100))
      .subscribe(
        value => this.filterCriteria = value,
        error => console.error(error));
  }
}
