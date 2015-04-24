import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'

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

store.handlers = {
  'billing.updateBillingAddress': updateBillingAddress
};

AppDispatcher.registerStore(store);

export default store
