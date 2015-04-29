import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'
import { getAjax, postAjax } from './Ajax'
import UserStore from './UserStore'

let billingAddress = {};

let store = StoreFactory.Create({
  getBillingAddress() {
    return billingAddress;
  }
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
