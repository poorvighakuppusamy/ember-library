import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  email:"",

  actions: {
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
     onSubmitForm() {
      let user = this.get('store').createRecord('refer-user', {
              email: this.get('email')
      });
       user.save().then(re=> {
        console.log(re)
        alert("Record saved Successfully")
        this.set("email","");
        location.reload();
      })
    }
  }

});