import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'

let user = {
  customerId : "0be6c25a-82c9-4e43-9648-bc8ab2624317"
};

let store = StoreFactory.Create({
  getUser() {
    return user;
  }
});

store.handlers = {
}

AppDispatcher.registerStore(store);

export default store

