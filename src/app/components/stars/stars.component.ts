import {Component, Input, OnInit} from '@angular/core';

@Component({
    templateUrl: 'stars.component.html',
    styles: [`.starrating {color: #d17581}`],
    selector: 'app-auction-stars'
})
export default class StarsComponent implements OnInit {
    @Input() count = 5;
    @Input() rating = 0;
    protected stars: boolean[] = [];

    ngOnInit(): void {
        for (let i = 1; i <= this.count; i++) {
            this.stars.push(i > this.rating);
        }
    }

}
