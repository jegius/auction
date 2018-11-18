import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-auction-search',
  templateUrl: 'search.component.html'
})
export default class SearchComponent {
  formModel: FormGroup = new FormGroup({
    'title': new FormControl(),
    'price': new FormControl(),
    'category': new FormControl()
  });
}
