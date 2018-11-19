import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../services/product.service.api';
import {ProductService, Review} from '../../services/product.service';

@Component({
  selector: 'app-auction-product-page',
  styles: ['auction-stars.large {font-size: 24px;}'],
  templateUrl: 'product-detail.component.html'
})
export default class ProductDetailComponent {
  product: Product;
  reviews: Review[];

  newComment: string;
  newRating: number;

  isReviewHidden = true;

  constructor(route: ActivatedRoute, productService: ProductService) {

    const prodId: number = parseInt(route.snapshot.params['productId']);
    this.product = productService.getProductById(prodId);

    this.reviews = productService.getReviewsForProduct(this.product.id);
  }

  addReview() {
    const review = new Review(0, this.product.id, new Date(), 'Anonymous',
      this.newRating, this.newComment);
    console.log('Adding review ' + JSON.stringify(review));
    this.reviews = [...this.reviews, review];
    this.product.rating = this.averageRating(this.reviews);

    this.resetForm();
  }

  averageRating(reviews: Review[]) {
    const sum = reviews.reduce((average, review) => average + review.rating, 0);
    return sum / reviews.length;
  }

  resetForm() {
    this.newRating = 0;
    this.newComment = null;
    this.isReviewHidden = true;
  }
}
