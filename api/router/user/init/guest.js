import Controller_Guest from '../controller/guest';
import { Authentic_Guest } from '../../../middleware/authentic';

export default (Router) => {
    //Authentic
    Router.get('/authentic/get', Authentic_Guest, Controller_Guest.Authentic.Get);
    Router.post('/authentic/signin', Controller_Guest.Authentic.SignIn);
    Router.post('/authentic/signup', Controller_Guest.Authentic.SignUp);

    //Contact
    Router.get('/contact/list/get', Authentic_Guest, Controller_Guest.Contact.Get);
    Router.post('/contact/create', Authentic_Guest, Controller_Guest.Contact.Create);
    Router.post('/contact/edit', Authentic_Guest, Controller_Guest.Contact.Edit);
    Router.post('/contact/delete', Authentic_Guest, Controller_Guest.Contact.Delete);
};