import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import BillingStore from './BillingStore'
import _ from 'lodash'
import { getJson, postJson } from './Ajax'
import UserStore from './UserStore'

let deliveryAddress = {};
let store = StoreFactory.Create({
  getDeliveryAddress() {
    return deliveryAddress;
  }
});

function updateDeliveryAddress(payload) {
  deliveryAddress = payload.address;
  store.emitChange();
}

function useBillingAddress(payload) {
  deliveryAddress = _.assign({}, BillingStore.getBillingAddress());
  store.emitChange();
}

function confirmOrder(payload) {
  postJson('/api/shipping/confirmorder', {
    customerId: UserStore.getUser().customerId,
    orderId: payload.orderId,
    deliveryAddress: deliveryAddress
  });
}

store.handlers = {
  'shipping.updateDeliveryAddress': updateDeliveryAddress,
  'shipping.useBillingAddress': useBillingAddress,
  'checkout.confirmOrder': confirmOrder
};

AppDispatcher.registerStore(store);

export default store

