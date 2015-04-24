import Events from 'events'
import _ from 'lodash'

class BaseStore extends Events.EventEmitter
{
  emitChange() {
    this.emit('change');
  }

  addChangeListener(callback) {
    this.on('change', callback);
    return () => this.removeListener('change', callback);
  }
}

function createStore(store) {
  // return _.assign({}, Events.EventEmitter.prototype, {
  return _.create(BaseStore.prototype, store);
}

export default { Create : createStore }

