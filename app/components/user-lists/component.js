import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  page:1,
  previous:computed('page', function(){
    return this.page - 1
  }),
  next: computed('page', function(){
    return this.page + 1
  }),
   actions: {
    onPagination(page){
      let that = this
      return this.store.query('user',{page: page}).then(function(user){
        console.log(user['content'].length)
        if (user['content'].length > 0){
          that.set('page',page)
        }
        that.set('users',user)
      })
    },
    onDeleteUser(value){
      let user = this.store.findRecord('user', value).then(function(user) {
          user.destroyRecord().then(re=>{
            alert("User Deleted Successfully")
            location.reload();
          })
      });
    }
  }
}).reopenClass({
  positionalParams: ['users']
});