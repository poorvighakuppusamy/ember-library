import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({

  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  name:"",
  description:"",
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
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
    onCloseForm(){
      location.reload();
    },
    onPagination(page){
      let that = this
      return this.store.query('author',{page: page}).then(function(author){
        console.log(author['content'].length)
        if (author['content'].length > 0){
          that.set('page',page)
        }
        that.set('authors',author)
      })
    },
    onSubmitForm(value) {
      console.log(value)
      let that = this
       let author = this.get('store').findRecord('author', value).then(function(author) {
        author.name = that.get('name');
        author.description = that.get('description');
        author.save().then(re=>{
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
  positionalParams: ['authors']
});