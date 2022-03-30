import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  status: "",
  actions: {
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