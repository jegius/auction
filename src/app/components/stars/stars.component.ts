import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    templateUrl: 'stars.component.html',
    styles: [`.starrating {color: #d17581}`],
    selector: 'app-auction-stars'
})
export default class StarsComponent {
  private _rating: number;
  private stars: boolean[];

  private maxStars = 5;

  @Input()
  readonly = true;

  @Input()
  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value || 0;
    this.stars = Array(this.maxStars).fill(true, 0, this.rating);
  }

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter();

  fillStarsWithColor(index) {

    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
