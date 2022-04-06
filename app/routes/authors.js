import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  },
  model() {
    return this.store.query('author',{page: 1})
  }
});