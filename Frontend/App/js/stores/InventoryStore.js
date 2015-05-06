import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'
import { getJson, postJson } from './Ajax'
import UserStore from './UserStore'

let items = [];

let store = StoreFactory.Create({
});

function confirmOrder(payload) {
  postJson('/api/inventory/confirmorder', {
    customerId: UserStore.getUser().customerId,
    orderId: payload.orderId,
    items
  });
}

function addToCart(payload) {
  let item = _.find(items, { articleId: payload.id });
  if (item)
    item.count++;
  else
    items.push({ articleId: payload.id, count: 1 });

  store.emitChange();
}

store.handlers = {
  'checkout.confirmOrder': confirmOrder,
  'shoppingcart.add': addToCart
};

AppDispatcher.registerStore(store);

export default store

