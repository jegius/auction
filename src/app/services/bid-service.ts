import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket-service';
import {Observable, Subscriber} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BidService {
  constructor(private webSocket: WebSocketService) {}

  watchProduct(productId: number): Observable<any> {
    const openSubscriber = Subscriber.create(
      () => this.webSocket.send({productId: productId}));

    return this.webSocket.createObservableSocket('ws://localhost:8000', openSubscriber)
      .pipe(map(message => JSON.parse(message)));
  }
}
