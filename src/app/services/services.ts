import {BidService} from './bid-service';
import {WebSocketService} from './websocket-service';
import {ProductService} from './product.service';

export const ONLINE_AUCTION_SERVICES = [
  BidService,
  ProductService,
  WebSocketService
];
