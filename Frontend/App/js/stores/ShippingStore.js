import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import BillingStore from './BillingStore'
import _ from 'lodash'

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

store.handlers = {
  'shipping.updateDeliveryAddress': updateDeliveryAddress,
  'shipping.useBillingAddress': useBillingAddress
};

AppDispatcher.registerStore(store);

export default store

