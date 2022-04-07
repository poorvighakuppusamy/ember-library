import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  selectedItemId: '',
  author: [],
  title:"",
  description:"",
  author_options: computed('author.[]', function(){
    return this.get('author');
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    this.store.findAll('author').then(re => {
      let aut_opt = re.map(aut => {
        return {key: aut.id, value: aut.name}
      })
      this.set('author', aut_opt)
    });
    
    
  },

  actions: {
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
    updateAuthDetails(val){
      this.set('selectedItemId', val)
    },
    onSubmitForm() {
      let book = this.get('store').createRecord('book', {
              title: this.get('title'),
              author_id: this.get('selectedItemId'),
              description: this.get('description')
      });
      book.save().then(re=>{
        alert("Book Added")
        this.set("title","");
        this.set("description","");
        location.reload();
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