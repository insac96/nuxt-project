//FOR USER

import express from 'express';
import Controller_Guest from './controller/guest'; 
import Controller_Admin from './controller/admin';
import { Authentic_Guest, Authentic_Admin } from '../../middleware/authentic';

let Router = express.Router();

/////////////////////GUEST - CONTROLLER/////////////////////
//Authentic
Router.get('/authentic/get', Authentic_Guest, Controller_Guest.Authentic.Get);
Router.post('/authentic/signin', Controller_Guest.Authentic.SignIn);
Router.post('/authentic/signup', Controller_Guest.Authentic.SignUp);

//Contact
Router.get('/contact/list/get', Authentic_Guest, Controller_Guest.Contact.Get);
Router.post('/contact/create', Authentic_Guest, Controller_Guest.Contact.Create);
Router.post('/contact/edit', Authentic_Guest, Controller_Guest.Contact.Edit);
Router.post('/contact/delete', Authentic_Guest, Controller_Guest.Contact.Delete);
/////////////////////END Guest - CONTROLLER/////////////////


/////////////////////ADMIN - CONTROLLER/////////////////////
//User
Router.post('/admin/member/get', Authentic_Admin, Controller_Admin.User.Get);

/////////////////////END Admin - CONTROLLER//////////////////

export default Router;