import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  name:"",
  email:"",
  phone:"",

  actions: {
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
    onSubmitForm() {
      let author = this.get('store').createRecord('user', {
              name: this.get('name'),
              email: this.get('email'),
              phone: this.get('phone')
      });
      author.save().then(re=> {
        console.log(re)
        this.set("name","");
        this.set("email","");
        this.set("phone","");
        alert("Record saved Successfully")
      })
    }
  }

});