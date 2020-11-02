//FOR LAPTOP
import express from 'express';
import Controller_Guest from './controller/guest'; 
import Controller_Admin from './controller/admin';
import { Authentic_Guest, Authentic_Admin } from '../../middleware/authentic';

let Router = express.Router();

/////////////////////GUEST - CONTROLLER/////////////////////
//Company - Guest
Router.get("/company/mini/get", Controller_Guest.Company.GetMini);

//Variant - Guest
Router.post("/variant/discount/get", Controller_Guest.Variant.GetByDiscount);
Router.post("/variant/status/get", Controller_Guest.Variant.GetByStatus);

//Product - Guest
Router.post("/product/link/get", Controller_Guest.Product.GetByLink);

//Comment
Router.post("/comment/add", Authentic_Guest, Controller_Guest.Comment.Add);
Router.post("/comment/more", Controller_Guest.Comment.More);
Router.post("/comment/reply/add", Authentic_Guest, Controller_Guest.Comment.AddReply);

/////////////////////END Guest - CONTROLLER//////////////////



/////////////////////ADMIN - CONTROLLER//////////////////////
//Company - Admin
Router.get("/admin/company/get", Authentic_Admin, Controller_Admin.Company.Get);
Router.get("/admin/company/mini/get", Authentic_Admin, Controller_Admin.Company.GetMini);
Router.post('/admin/company/create', Authentic_Admin, Controller_Admin.Company.Create);
Router.post('/admin/company/delete', Authentic_Admin, Controller_Admin.Company.Delete);
Router.post('/admin/company/edit', Authentic_Admin, Controller_Admin.Company.Edit);

//Trademark - Admin
Router.post('/admin/trademark/create', Authentic_Admin, Controller_Admin.Trademark.Create);
Router.post('/admin/trademark/delete', Authentic_Admin, Controller_Admin.Trademark.Delete);
Router.post('/admin/trademark/edit', Authentic_Admin, Controller_Admin.Trademark.Edit);

//Product - Admin
Router.post("/admin/product/get", Authentic_Admin, Controller_Admin.Product.Get);
Router.post('/admin/product/create', Authentic_Admin, Controller_Admin.Product.Create);
Router.post('/admin/product/delete', Authentic_Admin, Controller_Admin.Product.Delete);
Router.post('/admin/product/link/get', Authentic_Admin, Controller_Admin.Product.GetByLink);
Router.post('/admin/product/information/edit', Authentic_Admin, Controller_Admin.Product.EditInformation);
Router.post('/admin/product/images/edit', Authentic_Admin, Controller_Admin.Product.EditImages);
Router.post('/admin/product/visibility/edit', Authentic_Admin, Controller_Admin.Product.EditVisibility);

//News - Admin
Router.post('/admin/news/get', Authentic_Admin, Controller_Admin.News.Get);
Router.post('/admin/news/create', Authentic_Admin, Controller_Admin.News.Create);
//Router.post('/admin/news/edit', Authentic_Admin, Controller_Admin.News.Edit);
Router.post('/admin/news/delete', Authentic_Admin, Controller_Admin.News.Delete);
Router.post('/admin/news/visibility/edit', Authentic_Admin, Controller_Admin.News.EditVisibility);
Router.post('/admin/news/top/edit', Authentic_Admin, Controller_Admin.News.EditTop);

//Configuration - Admin
Router.post('/admin/configuration/default/edit', Authentic_Admin, Controller_Admin.Configuration.EditDefault);
Router.post('/admin/configuration/upgrade/edit', Authentic_Admin, Controller_Admin.Configuration.EditUpgrade);

//Variant - Admin
Router.post('/admin/variant/create', Authentic_Admin, Controller_Admin.Variant.Create);
Router.post('/admin/variant/edit', Authentic_Admin, Controller_Admin.Variant.Edit);
Router.post('/admin/variant/delete', Authentic_Admin, Controller_Admin.Variant.Delete);
Router.post('/admin/variant/discount/edit', Authentic_Admin, Controller_Admin.Variant.EditDiscount);

//VariantColor - Admin
Router.post('/admin/variant/color/create', Authentic_Admin, Controller_Admin.VariantColor.Create);
Router.post('/admin/variant/color/edit', Authentic_Admin, Controller_Admin.VariantColor.Edit);
Router.post('/admin/variant/color/delete', Authentic_Admin, Controller_Admin.VariantColor.Delete);

//Article - Admin
Router.post('/admin/article/create', Authentic_Admin, Controller_Admin.Article.Create);
Router.post('/admin/article/edit', Authentic_Admin, Controller_Admin.Article.Edit);

//Comment - Admin
Router.post('/admin/comment/add', Authentic_Admin, Controller_Admin.Comment.Add);
Router.post('/admin/comment/delete', Authentic_Admin, Controller_Admin.Comment.Delete);

//Reply - Admin
Router.post('/admin/comment/reply/add', Authentic_Admin, Controller_Admin.Comment.AddReply);
Router.post('/admin/comment/reply/delete', Authentic_Admin, Controller_Admin.Comment.DeleteReply);
/////////////////////END Admin - CONTROLLER//////////////////

export default Router;