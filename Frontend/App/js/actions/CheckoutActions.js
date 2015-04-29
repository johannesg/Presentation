import AppDispatcher from '../AppDispatcher'

export default {
  confirmOrder(orderId) {
    AppDispatcher.dispatch({
      actionType: 'checkout.confirmOrder',
      orderId
    });
  }
}

