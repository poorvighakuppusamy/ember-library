import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    status: DS.attr(),
    user_id: DS.attr(),
    book_id: DS.attr(),
    return_date: DS.attr('date'),
    borrowed_date:DS.attr('date'),
    book:DS.belongsTo('book'),
    user:DS.belongsTo('user'),

    formatedReturnDate: computed('return_date', function() {
        return this.return_date.toLocaleDateString()
      }),
    formatedBorrowedDate: computed('borrowed_date', function() {
        return this.borrowed_date.toLocaleDateString()
      })
});
