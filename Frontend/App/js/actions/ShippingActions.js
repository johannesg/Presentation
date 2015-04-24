import AppDispatcher from '../AppDispatcher'

export default {
  updateDeliveryAddress(address) {
    AppDispatcher.dispatch({
      actionType: 'shipping.updateDeliveryAddress',
      address
    });
  },
  useBillingAddress() {
    AppDispatcher.dispatch({
      actionType: 'shipping.useBillingAddress'
    });
  }
}


