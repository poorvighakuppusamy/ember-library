import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
    description: DS.attr(),
    books: DS.hasMany('book')
});
