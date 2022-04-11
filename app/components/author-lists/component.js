import Component from '@ember/component';
import { computed } from '@ember/object';
export default Component.extend({

  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  name:"",
  shownext:1,
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
    onDeleteFunction(value){
      let author = this.store.findRecord('author', value).then(function(author) {
          author.destroyRecord().then(re=>{
            alert("Record Deleted Successfully")
            location.reload();
          })
      });
    },
    onPagination(page){
      let that = this
      return this.store.query('author',{page: page}).then(function(author){
        console.log(author['content'].length)
        if (author['meta']['total-pages'] == author['meta']['current-page']){
          that.set('shownext',0)
        }
        else{
          that.set('page',page)
          that.set('shownext',1)
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