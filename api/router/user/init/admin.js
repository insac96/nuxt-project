import Controller_Admin from '../controller/admin';
import { Authentic, Admin, Smod, View } from '../../../middleware/authentic';

export default (Router) => {
    //User
    Router.post('/admin/member/get', Authentic, View, Controller_Admin.User.Get);
    Router.post('/admin/member/ban', Authentic, Smod, Controller_Admin.User.Ban);
    Router.post('/admin/member/unban', Authentic, Smod, Controller_Admin.User.Unban);
    Router.post('/admin/member/role/change', Authentic, Admin, Controller_Admin.User.ChangeRole);
};