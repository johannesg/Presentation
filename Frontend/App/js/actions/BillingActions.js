import AppDispatcher from '../AppDispatcher'

export default {
  updateBillingAddress(address) {
    AppDispatcher.dispatch({
      actionType: 'billing.updateBillingAddress',
      address
    });
  }
}


