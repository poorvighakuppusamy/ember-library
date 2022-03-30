import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
    description: DS.attr(),
    author_id: DS.attr(),
    author:DS.belongsTo('author')
});
