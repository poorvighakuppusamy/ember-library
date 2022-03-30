
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  session: Ember.inject.service('session'),
  session_auth: computed('session.data.authenticated.access_token', {
    get() {
      return this.session.data.authenticated.access_token
    },
    set(propertyName, newValue) {

      this.set('session_auth', newValue);

      return newValue;
    }
  }),
  host: 'http://localhost:3000',

  init() {

    this._super(...arguments);
    let hes = {
      'Accept': 'application/json; charset=utf-8',
      'content-type': 'application/json; charset=utf-8',
      'Authenticate': this.session_auth
    };
    this.set('headers', hes);
  },
  pathForType(type) {
    var underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  }
});