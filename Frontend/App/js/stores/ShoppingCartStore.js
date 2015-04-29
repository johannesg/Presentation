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
  let item = _.find(items, { id: payload.item.id });
  if (item) {
    item.count++;
  }
  else
    items.push({ 
      id: payload.item.id,
      article: payload.item,
      count: 1,
    });

  console.debug(`Item ${payload.item.id} added to cart`);
  store.emitChange();
}

store.handlers = {
  'shoppingcart.add': addToCart
}

AppDispatcher.registerStore(store);

export default store
