import ApplicationSerializer from './application';
import { underscore } from '@ember/string';
import { get } from '@ember/object';

export default ApplicationSerializer.extend({
    normalize(typeClass, hash) {
      hash.attributes.return_date = Number(hash.attributes['return-date'])
      hash.attributes.borrowed_date = Number(hash.attributes['borrowed-date'])
      return this._super.apply(this, arguments);
    }
});
