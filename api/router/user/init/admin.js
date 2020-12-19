import Controller_Admin from '../controller/admin';
import { Authentic_Smod, Authentic_Admin } from '../../../middleware/authentic';

export default (Router) => {
    //User
    Router.post('/admin/member/get', Authentic_Smod, Controller_Admin.User.Get);
    Router.post('/admin/member/ban', Authentic_Smod, Controller_Admin.User.Ban);
    Router.post('/admin/member/unban', Authentic_Smod, Controller_Admin.User.Unban);
    Router.post('/admin/member/role/change', Authentic_Admin, Controller_Admin.User.ChangeRole);
};