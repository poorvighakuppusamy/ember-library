import Component from '@ember/component';

export default Component.extend({

store: Ember.inject.service('store'),
  name:"",
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