import {Component, Input} from "@angular/core";
import {Product} from "../../services/product.service.api";

@Component({
    selector: 'auction-product-item',
    templateUrl: 'app/components/product-item/product-item.component.html'
})
export default class ProductItemComponent {
    @Input() product: Product;
}