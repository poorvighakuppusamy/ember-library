import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  session = Ember.inject.service('session');

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}