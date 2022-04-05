import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('books');
  this.route('add-book');
  this.route('authors');
  this.route('add-author');
  this.route('users');
  this.route('add-user');
  this.route('borrower-details');
  this.route('borrow-book');
  this.route('home');
  this.route('login');
  this.route('sign-up');
  this.route('refer-user');
});

export default Router;