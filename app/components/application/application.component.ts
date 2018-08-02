import {Component, ViewEncapsulation} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {Product} from "../../services/product.service.api";

@Component({
    selector: 'auction-application',
    templateUrl: 'app/components/application/application.component.html',
    styleUrls: ['app/components/application/application.component.css'],
    encapsulation: ViewEncapsulation.None
})

export default class ApplicationComponent {
    protected products: Array<Product> = [];

    constructor(private productService: ProductService) {
        this.products = productService.getProducts();
    }
}