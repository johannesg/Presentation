import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'

let items = [];
let store = StoreFactory.Create({
  getCart() {
    return { items: items };
  }
});

function addToCart(payload) {
  let item = _.find(items, { id: payload.item.Id });
  if (item) {
    item.count++;
    item.total = item.Price * item.Count;
  }
  else
    items.push({ 
      id: payload.item.Id,
      price: payload.item.Price,
      count: 1,
      total: payload.item.Price 
    });

  console.debug(`Item ${payload.id} added to cart`);
  console.debug(items);
  store.emitChange();
}

store.handlers = {
  'shoppingcart.add': addToCart
}

AppDispatcher.registerStore(store);

export default store
