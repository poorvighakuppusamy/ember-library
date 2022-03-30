import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  selectedUserId: '',
  selectedBookId: '',
  user: [],
  book: [],
  status:"Pending",
  user_options: computed('user.[]', function(){
    return this.get('user');
  }),
  book_options: computed('book.[]', function(){
    return this.get('book');
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    this.store.findAll('user').then(re => {
      let user_opt = re.map(use => {
        return {key: use.id, value: use.name}
      })
      this.set('user', user_opt)
    });
    this.store.findAll('book').then(re => {
      let book_opt = re.map(boo => {
        return {key: boo.id, value: boo.title}
      })
      this.set('book', book_opt)
    });
  },

  actions: {
    updateUserDetails(val){
      this.set('selectedUserId', val)
    },
    updateBookDetails(val){
      this.set('selectedBookId', val)
    },
    onSubmitForm() {
      let borrower = this.get('store').createRecord('borrower-detail', {
              status: this.get('status'),
              user_id: this.get('selectedUserId'),
              book_id: this.get('selectedBookId'),
      });
      borrower.save().then(re=>{
        alert("Details Updated")
        this.set("status","");
        location.reload();
      })
    }
  }

});