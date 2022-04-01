import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @service router;

  @action
  async authenticate(e) {
    e.preventDefault();
    let { identification, password } = this;
    try {
      await this.session.authenticate('authenticator:oauth2', identification, password);
    } catch(error) {
      // this.errorMessage = error.error || error;
      this.set('identification', null)
      this.set('password', null)
      this.errorMessage = ''
      alert('Authentication Failed')
    }

    if (this.session.isAuthenticated) {
      this.router.transitionTo('home')
      console.log(this.session.isAuthenticated)
    }
  }

  @action
  updateIdentification(e) {
    this.identification = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }
}