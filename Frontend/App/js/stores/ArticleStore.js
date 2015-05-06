import AppDispatcher from '../AppDispatcher'
import StoreFactory from './StoreFactory'
import _ from 'lodash'
import { getJson, postJson } from './Ajax'
import UserStore from './UserStore'

let articles = [];

let store = StoreFactory.Create({
  getArticles() {
    return articles;
  },
  getArticle(id) {
    return _.find(articles, { id });
  }
});

getJson('/api/articles')
  .then(result => {
    articles = result;
    store.emitChange();
  });

store.handlers = {
};

AppDispatcher.registerStore(store);

export default store

