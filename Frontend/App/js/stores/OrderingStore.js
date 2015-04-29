import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'
import { getAjax, postAjax } from './Ajax'
import UserStore from './UserStore'

let store = StoreFactory.Create({
});

function confirmOrder(payload) {
  postAjax('/api/ordering/confirmorder', {
    customerId: UserStore.getUser().customerId,
    orderId: payload.orderId
  });

  store.emitChange();
}

store.handlers = {
  'checkout.confirmOrder': confirmOrder,
};

AppDispatcher.registerStore(store);

export default store


