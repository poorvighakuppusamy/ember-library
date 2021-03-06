import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),
  title:"",
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
      let book = this.store.findRecord('book', value).then(function(book) {
          book.destroyRecord().then(re=>{
            alert("Record Deleted Successfully")
            location.reload();
          })
      });
    },
    onPagination(page){
      let that = this
      return this.store.query('book',{page: page}).then(function(book){
        console.log(book['content'].length)
        if (book['meta']['total-pages'] == book['meta']['current-page']){
          that.set('shownext',0)
        }
        else{
          that.set('page',page)
          that.set('shownext',1)
        }
        that.set('books',book)
      })
    },
    onSubmitForm(value) {
      let that = this
       let book = this.get('store').findRecord('book', value).then(function(book) {
        book.title = that.get('title');
        book.description = that.get('description');
        book.save().then(re=>{
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
  positionalParams: ['books']
  
});

