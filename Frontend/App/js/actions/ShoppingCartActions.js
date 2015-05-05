import AppDispatcher from '../AppDispatcher'

export default {
  addToCart(id) {
    AppDispatcher.dispatch({
      actionType: 'shoppingcart.add',
      id: id
    });
  }
}

