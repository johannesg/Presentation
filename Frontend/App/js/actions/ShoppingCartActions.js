import AppDispatcher from '../AppDispatcher'

export default {
  addToCart(item) {
    AppDispatcher.dispatch({
      actionType: 'shoppingcart.add',
      item: item
    });
  }
}

