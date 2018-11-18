import {Component} from '@angular/core';
import {Product} from '../../services/product.service.api';
import {ProductService} from '../../services/product.service';

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
            <div *ngFor="let product of products"
                 class="col-sm-4 col-lg-4 col-md-4">
                <app-auction-product-item [product]="product">
                </app-auction-product-item>
            </div>
        </div>
    `
})
export default class HomeComponent {
    products: Product[] = [];

    constructor(private productService: ProductService) {
        this.products = this.productService.getProducts();
    }
}
