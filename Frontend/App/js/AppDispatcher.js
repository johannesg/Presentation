import flux from 'flux'

class AppDispatcher extends flux.Dispatcher
{
  registerStore(store) {
    store.dispatcherIndex =  this.register(action => {
      let handler = store.handlers[action.actionType];
      if (handler)
        handler(action)
    });
  }
}

let dispatcher = new AppDispatcher();

dispatcher.register(action => {
  console.log('Action: ' + action.actionType);
});

export default dispatcher;

