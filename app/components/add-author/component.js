import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  name:"",
  description:"",

  actions: {
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
    onSubmitForm() {
      let author = this.get('store').createRecord('author', {
              name: this.get('name'),
              description: this.get('description')
      });
      author.save().then(re=> {
        this.set("name","");
        this.set("description","");
        alert("Record saved Successfully")
      }).catch((err) => {
        if(err.errors[0]["status"] == 401){
          alert("User have no permission to Add Book")
          this.set("title","");
          this.set("description","");
        }  

          });
    }
  }

});