import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'
import { getAjax, postAjax } from './Ajax'
import UserStore from './UserStore'

let billingAddress = {};
let prices = [];

let store = StoreFactory.Create({
  getBillingAddress() {
    return billingAddress;
  },
  getPrice(id) {
    let p = _.find(prices, {id: id});
    if (p)
      return p.price;
    return null;
  }
});

getAjax('/api/billing/prices')
  .then(result => {
    prices = result;
    store.emitChange();
  });

function updateBillingAddress(payload) {
  billingAddress = payload.address;
  store.emitChange();
}

function confirmOrder(payload) {
  postAjax('/api/billing/confirmorder', {
    customerId: UserStore.getUser().customerId,
    orderId: payload.orderId,
    billingAddress : billingAddress
  });
}

store.handlers = {
  'billing.updateBillingAddress': updateBillingAddress,
  'checkout.confirmOrder': confirmOrder
};

AppDispatcher.registerStore(store);

export default store
