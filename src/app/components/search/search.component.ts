import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-auction-search',
  templateUrl: 'search.component.html',
  providers: [ProductService]
})
export default class SearchComponent {
  formModel: FormGroup;
  categories: string[];

  constructor(private productService: ProductService) {
    this.categories = this.productService.getAllCategories();

    const fb = new FormBuilder();
    this.formModel = fb.group({
      'title': [null, Validators.minLength(3)],
      'price': [null, positiveNumberValidator],
      'category': [-1]
    });
  }

  onSearch() {
    if (this.formModel.valid) {
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }
}

function positiveNumberValidator(control: FormControl): any {
  if (!control.value) {
    return null;
  }
  const price = parseInt(null, control.value);
  return price === null ||
  typeof price === 'number' &&
  price > 0 ? null : {positivenumber: true};
}

