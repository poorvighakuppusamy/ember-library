import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
	keyForAttribute = function(key) {
      // From http://emberjs.com/api/classes/Ember.String.html#method_underscore
      return Ember.String.underscore(key);
    }

}