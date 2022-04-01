import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service('store'),
  title:"",
  description:"",

  actions: {
    onChangeInput(event) {
      this.set(event.target.name,event.target.value);
    },
    onCloseForm(){
      location.reload();
    },
    onSubmitForm(value) {
      console.log(value)
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

