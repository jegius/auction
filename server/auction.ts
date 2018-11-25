import * as express from 'express';
import * as path from 'path';
import {Server as HttpServer} from 'http';
import {Server as WsServer} from 'ws';
import {Product, Review, getProducts, getProductById, getReviewsByProductId} from './model';

// HTTP API

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/api/products', (req, res) => {
  res.json(getProducts(req.query));
});

app.get('/api/products/:id', (req, res) => {
  res.json(getProductById(parseInt(req.params.id, 10)));
});

app.get('/api/products/:id/reviews', (req, res) => {
  res.json(getReviewsByProductId(parseInt(req.params.id, 10)));
});

const httpServer: HttpServer = app.listen(8000, 'localhost', () => {
  const {address, port}: any = httpServer.address();
  console.log('Listening on %s:%s', address, port);
});

// Using WS API

// Create the WebSocket server listening to the same port as HTTP server
const wsServer: WsServer = new WsServer({server: httpServer});
wsServer.on('connection', ws => {
  ws.on('message', (message: string) => {
    const subscriptionRequest = JSON.parse(message);
    subscribeToProductBids({client: ws, productId: subscriptionRequest.productId});
  });
});

setInterval(() => {
  generateNewBids();
  broadcastNewBidsToSubscribers();
}, 2000);

// Helper functions

// The map key is a reference to WebSocket connection that represents a user.
const subscriptions = new Map<any, number[]>();

function subscribeToProductBids(parameters: { client: any, productId: number }): void {
  const {client, productId} = parameters;
  const products = subscriptions.get(client) || [];
  subscriptions.set(client, [...products, productId]);
}

// Bid generator

const currentBids = new Map<number, number>();

function generateNewBids() {
  getProducts().forEach(p => {
    const currentBid = currentBids.get(p.id) || p.price;
    const newBid = random(currentBid, currentBid + 5); // Max bid increase is $5
    currentBids.set(p.id, newBid);
  });
}

function broadcastNewBidsToSubscribers() {

  subscriptions.forEach((products: number[], ws: WebSocket) => {
    if (ws.readyState === 1) { // 1 - READY_STATE_OPEN
      const newBids = products.map(pid => ({
        productId: pid,
        bid: currentBids.get(pid)
      }));
      ws.send(JSON.stringify(newBids));
    } else {
      subscriptions.delete(ws);
    }
  });
}

function random(low: number, high: number): number {
  return Math.random() * (high - low) + low;
}
