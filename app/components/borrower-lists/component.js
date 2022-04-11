import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  shownext: 1,
  status: "",
  page:1,
  previous:computed('page', function(){
    return this.page - 1
  }),
  next: computed('page', function(){
    return this.page + 1
  }),
  role: computed('session.data.authenticated.role', {
    get() {
      return this.session.data.authenticated.role
    },
  }),
  
  actions: {
    onPagination(page){
      let that = this
      return this.store.query('borrower-detail',{page: page}).then(function(borrower){
        console.log(borrower['meta']['total-pages'])
        console.log(borrower['meta']['current-page'])
        if (borrower['meta']['total-pages'] <= borrower['meta']['current-page']){
          that.set('shownext',0)
        }
        else{
          that.set('page',page)
          that.set('shownext',1)
        }
        that.set('borrowers',borrower)
      })
    },
    onReturnBook(value){
      let borrower = this.get('store').findRecord('borrower-detail', value).then(function(borrower) {
        borrower.status = "Returned";
        borrower.save().then(re=>{
          alert("Updated Successfully")
          location.reload();
        }).catch((err)=>{
           if(err.errors[0]["status"] == 401){
              alert("Only admin can update the details")
              location.reload();
        }  
        })
      });
    }
  }
}).reopenClass({
  positionalParams: ['borrowers']
});