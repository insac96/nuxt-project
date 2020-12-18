//FOR LAPTOP

import express from 'express';
import Controller_Guest from './controller/guest'; 
import Controller_Admin from './controller/admin';
import { Authentic_Guest, Authentic_Smod, Authentic_Admin } from '../../middleware/authentic';

let Router = express.Router();

/////////////////////GUEST - CONTROLLER/////////////////////
//Company - Guest
Router.get("/company/list/getInfo", Controller_Guest.Company.GetListOnlyInfo);

//Product - Guest
Router.post("/product/getByLink", Controller_Guest.Product.GetByLink);

//Variant - Guest
Router.post("/variant/list/getByDiscount", Controller_Guest.Variant.GetListByDiscount);
Router.post("/variant/list/getByStatus", Controller_Guest.Variant.GetListByStatus);
Router.post("/variant/list/search", Controller_Guest.Variant.SearchVariant);

//News - Guest
Router.get("/news/list/getByTop", Controller_Guest.News.GetListByTop);
Router.post("/news/getByLink", Controller_Guest.News.GetByLink);

//Comment
Router.post("/comment/list/getByProductID", Controller_Guest.Comment.GetListByProductID);
Router.post("/comment/more", Controller_Guest.Comment.More);
Router.post("/comment/add", Authentic_Guest, Controller_Guest.Comment.Add);
Router.post("/comment/reply/add", Authentic_Guest, Controller_Guest.Comment.AddReply);

//Cart
Router.post("/cart/list/get", Controller_Guest.Cart.GetList);

//Order
Router.post("/order/create", Authentic_Guest, Controller_Guest.Order.Create);
/////////////////////END Guest - CONTROLLER//////////////////



/////////////////////ADMIN - CONTROLLER//////////////////////
//Company - Admin
Router.get("/admin/company/list/get", Authentic_Smod, Controller_Admin.Company.Get);
Router.get("/admin/company/list/getInfo", Authentic_Smod, Controller_Admin.Company.GetListOnlyInfo);
Router.post('/admin/company/create', Authentic_Smod, Controller_Admin.Company.Create);
Router.post('/admin/company/edit', Authentic_Smod, Controller_Admin.Company.Edit);
Router.post('/admin/company/delete', Authentic_Admin, Controller_Admin.Company.Delete);

//Trademark - Admin
Router.post('/admin/trademark/create', Authentic_Smod, Controller_Admin.Trademark.Create);
Router.post('/admin/trademark/edit', Authentic_Smod, Controller_Admin.Trademark.Edit);
Router.post('/admin/trademark/delete', Authentic_Admin, Controller_Admin.Trademark.Delete);

//Product - Admin
Router.post("/admin/product/list/get", Authentic_Smod, Controller_Admin.Product.Get);
Router.post('/admin/product/create', Authentic_Smod, Controller_Admin.Product.Create);
Router.post('/admin/product/delete', Authentic_Admin, Controller_Admin.Product.Delete);
Router.post('/admin/product/getByLink', Authentic_Smod, Controller_Admin.Product.GetByLink);
Router.post('/admin/product/information/edit', Authentic_Smod, Controller_Admin.Product.EditInformation);
Router.post('/admin/product/images/edit', Authentic_Smod, Controller_Admin.Product.EditImages);
Router.post('/admin/product/visibility/edit', Authentic_Smod, Controller_Admin.Product.EditVisibility);

//News - Admin
Router.post('/admin/news/list/get', Authentic_Smod, Controller_Admin.News.Get);
Router.post('/admin/news/getByID', Authentic_Smod, Controller_Admin.News.GetByID);
Router.post('/admin/news/create', Authentic_Smod, Controller_Admin.News.Create);
Router.post('/admin/news/delete', Authentic_Admin, Controller_Admin.News.Delete);
Router.post('/admin/news/visibility/edit', Authentic_Smod, Controller_Admin.News.EditVisibility);
Router.post('/admin/news/top/edit', Authentic_Smod, Controller_Admin.News.EditTop);
Router.post('/admin/news/information/edit', Authentic_Smod, Controller_Admin.News.EditInformation);
Router.post('/admin/news/content/edit', Authentic_Smod, Controller_Admin.News.EditContent);

//Configuration - Admin
Router.post('/admin/configuration/default/edit', Authentic_Smod, Controller_Admin.Configuration.EditDefault);
Router.post('/admin/configuration/upgrade/edit', Authentic_Smod, Controller_Admin.Configuration.EditUpgrade);

//Variant - Admin
Router.post('/admin/variant/create', Authentic_Smod, Controller_Admin.Variant.Create);
Router.post('/admin/variant/edit', Authentic_Smod, Controller_Admin.Variant.Edit);
Router.post('/admin/variant/delete', Authentic_Admin, Controller_Admin.Variant.Delete);
Router.post('/admin/variant/discount/edit', Authentic_Smod, Controller_Admin.Variant.EditDiscount);
Router.post('/admin/variant/status/edit', Authentic_Smod, Controller_Admin.Variant.EditStatus);

//VariantColor - Admin
Router.post('/admin/variant/color/create', Authentic_Smod, Controller_Admin.VariantColor.Create);
Router.post('/admin/variant/color/edit', Authentic_Smod, Controller_Admin.VariantColor.Edit);
Router.post('/admin/variant/color/delete', Authentic_Admin, Controller_Admin.VariantColor.Delete);

//WareHouse - Admin
Router.post('/admin/warehouse/import', Authentic_Smod, Controller_Admin.Warehouse.Import);
Router.post('/admin/warehouse/export/price/edit', Authentic_Smod, Controller_Admin.Warehouse.EditExportPrice);
Router.post('/admin/warehouse/delete', Authentic_Admin, Controller_Admin.Warehouse.Delete);

//WareHouse Color - Admin
Router.post('/admin/warehouse/color/create', Authentic_Smod, Controller_Admin.WarehouseColor.Create);
Router.post('/admin/warehouse/color/delete', Authentic_Admin, Controller_Admin.WarehouseColor.Delete);

//Article - Admin
Router.post('/admin/article/create', Authentic_Smod, Controller_Admin.Article.Create);
Router.post('/admin/article/edit', Authentic_Smod, Controller_Admin.Article.Edit);

//Comment - Admin
Router.post('/admin/comment/add', Authentic_Smod, Controller_Admin.Comment.Add);
Router.post('/admin/comment/delete', Authentic_Admin, Controller_Admin.Comment.Delete);

//Reply - Admin
Router.post('/admin/comment/reply/add', Authentic_Smod, Controller_Admin.Comment.AddReply);
Router.post('/admin/comment/reply/delete', Authentic_Admin, Controller_Admin.Comment.DeleteReply);

//Order - Admin
Router.post('/admin/order/list/getByType', Authentic_Smod, Controller_Admin.Order.GetListByType);
Router.post('/admin/order/delete', Authentic_Smod, Controller_Admin.Order.Delete);
Router.post('/admin/order/status/edit', Authentic_Smod, Controller_Admin.Order.EditStatus);
Router.post('/admin/order/done/edit', Authentic_Smod, Controller_Admin.Order.EditDone);
Router.post('/admin/order/information/edit', Authentic_Smod, Controller_Admin.Order.EditInformation);

//ProductOrder - Admin
Router.post('/admin/order/product/list/get', Authentic_Smod, Controller_Admin.Order.GetListProductOrder);
Router.post('/admin/order/product/delete', Authentic_Smod, Controller_Admin.Order.DeleteProductOrder);
Router.post('/admin/order/product/edit', Authentic_Smod, Controller_Admin.Order.EditProductOrder);
Router.post('/admin/order/product/add', Authentic_Smod, Controller_Admin.Order.AddProductOrder);
Router.post('/admin/order/product/add/search', Authentic_Smod, Controller_Admin.Order.SearchProductForOrder);
/////////////////////END Admin - CONTROLLER//////////////////

export default Router;