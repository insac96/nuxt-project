//FOR ADMIN - INIT ROUTER

import Controller_Admin from '../controller/admin';
import { Authentic_Smod, Authentic_Admin } from '../../../middleware/authentic';

export default (Router) => {
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
    Router.post('/admin/warehouse/visibility/edit', Authentic_Smod, Controller_Admin.Warehouse.EditVisibility);
    Router.post('/admin/warehouse/delete', Authentic_Admin, Controller_Admin.Warehouse.Delete);

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
    Router.post('/admin/order/product/list/get', Authentic_Smod, Controller_Admin.ProductOrder.GetListProductOrder);
    Router.post('/admin/order/product/delete', Authentic_Smod, Controller_Admin.ProductOrder.DeleteProductOrder);
    Router.post('/admin/order/product/edit', Authentic_Smod, Controller_Admin.ProductOrder.EditProductOrder);
    Router.post('/admin/order/product/add', Authentic_Smod, Controller_Admin.ProductOrder.AddProductOrder);
    Router.post('/admin/order/product/add/search', Authentic_Smod, Controller_Admin.ProductOrder.SearchProductForOrder);

    //Statistical - Admin
    Router.get('/admin/statistical/general/get', Authentic_Smod, Controller_Admin.Statistical.GetGeneral);
};