//FOR ADMIN - INIT ROUTER

import Controller_Admin from '../controller/admin';
import { Authentic, Admin, Smod, View } from '../../../middleware/authentic';

export default (Router) => {
    //Company - Admin
    Router.get("/admin/company/list/get", Authentic, View, Controller_Admin.Company.Get);
    Router.get("/admin/company/list/getInfo", Authentic, View, Controller_Admin.Company.GetListOnlyInfo);
    Router.post('/admin/company/create', Authentic, Smod, Controller_Admin.Company.Create);
    Router.post('/admin/company/edit', Authentic, Smod, Controller_Admin.Company.Edit);
    Router.post('/admin/company/delete', Authentic, Admin, Controller_Admin.Company.Delete); //Only Admin

    //Trademark - Admin
    Router.post('/admin/trademark/create', Authentic, Smod, Controller_Admin.Trademark.Create);
    Router.post('/admin/trademark/edit', Authentic, Smod, Controller_Admin.Trademark.Edit);
    Router.post('/admin/trademark/delete', Authentic, Admin, Controller_Admin.Trademark.Delete); //Only Admin

    //Product - Admin
    Router.post("/admin/product/list/get", Authentic, View, Controller_Admin.Product.Get);
    Router.post('/admin/product/create', Authentic, Smod, Controller_Admin.Product.Create);
    Router.post('/admin/product/delete', Authentic, Admin, Controller_Admin.Product.Delete); //Only Admin
    Router.post('/admin/product/getByLink', Authentic, View, Controller_Admin.Product.GetByLink);
    Router.post('/admin/product/information/edit', Authentic, Smod, Controller_Admin.Product.EditInformation);
    Router.post('/admin/product/images/edit', Authentic, Smod, Controller_Admin.Product.EditImages);
    Router.post('/admin/product/visibility/edit', Authentic, Smod, Controller_Admin.Product.EditVisibility);

    //News - Admin
    Router.post('/admin/news/list/get', Authentic, View, Controller_Admin.News.Get);
    Router.post('/admin/news/getByID', Authentic, View, Controller_Admin.News.GetByID);
    Router.post('/admin/news/create', Authentic, Smod, Controller_Admin.News.Create);
    Router.post('/admin/news/delete', Authentic, Admin, Controller_Admin.News.Delete); //Only Admin
    Router.post('/admin/news/visibility/edit', Authentic, Smod, Controller_Admin.News.EditVisibility);
    Router.post('/admin/news/top/edit', Authentic, Smod, Controller_Admin.News.EditTop);
    Router.post('/admin/news/information/edit', Authentic, Smod, Controller_Admin.News.EditInformation);
    Router.post('/admin/news/content/edit', Authentic, Smod, Controller_Admin.News.EditContent);

    //Configuration - Admin
    Router.post('/admin/configuration/default/edit', Authentic, Smod, Controller_Admin.Configuration.EditDefault);
    Router.post('/admin/configuration/upgrade/edit', Authentic, Smod, Controller_Admin.Configuration.EditUpgrade);

    //Variant - Admin
    Router.post('/admin/variant/create', Authentic, Smod, Controller_Admin.Variant.Create);
    Router.post('/admin/variant/edit', Authentic, Smod, Controller_Admin.Variant.Edit);
    Router.post('/admin/variant/delete', Authentic, Admin, Controller_Admin.Variant.Delete); //Only Admin
    Router.post('/admin/variant/discount/edit', Authentic, Smod, Controller_Admin.Variant.EditDiscount);
    Router.post('/admin/variant/status/edit', Authentic, Smod, Controller_Admin.Variant.EditStatus);

    //VariantColor - Admin
    Router.post('/admin/variant/color/create', Authentic, Smod, Controller_Admin.VariantColor.Create);
    Router.post('/admin/variant/color/edit', Authentic, Smod, Controller_Admin.VariantColor.Edit);
    Router.post('/admin/variant/color/delete', Authentic, Admin, Controller_Admin.VariantColor.Delete); //Only Admin

    //WareHouse - Admin
    Router.post('/admin/warehouse/import', Authentic, Smod, Controller_Admin.Warehouse.Import);
    Router.post('/admin/warehouse/export/price/edit', Authentic, Smod, Controller_Admin.Warehouse.EditExportPrice);
    Router.post('/admin/warehouse/visibility/edit', Authentic, Smod, Controller_Admin.Warehouse.EditVisibility);
    Router.post('/admin/warehouse/delete', Authentic, Admin, Controller_Admin.Warehouse.Delete); //Only Admin

    //Article - Admin
    Router.post('/admin/article/create', Authentic, Smod, Controller_Admin.Article.Create);
    Router.post('/admin/article/edit', Authentic, Smod, Controller_Admin.Article.Edit);

    //Comment - Admin
    Router.post('/admin/comment/add', Authentic, Controller_Admin.Comment.Add);
    Router.post('/admin/comment/delete', Authentic, Smod, Controller_Admin.Comment.Delete);

    //Reply - Admin
    Router.post('/admin/comment/reply/add', Authentic, Controller_Admin.Comment.AddReply);
    Router.post('/admin/comment/reply/delete', Authentic, Smod, Controller_Admin.Comment.DeleteReply);

    //Order - Admin
    Router.post('/admin/order/list/getByType', Authentic, View, Controller_Admin.Order.GetListByType);
    Router.post('/admin/order/delete', Authentic, Smod, Controller_Admin.Order.Delete);
    Router.post('/admin/order/status/edit', Authentic, Smod, Controller_Admin.Order.EditStatus);
    Router.post('/admin/order/done/edit', Authentic, Smod, Controller_Admin.Order.EditDone);
    Router.post('/admin/order/information/edit', Authentic, Smod, Controller_Admin.Order.EditInformation);

    //ProductOrder - Admin
    Router.post('/admin/order/product/list/get', Authentic, View, Controller_Admin.ProductOrder.GetListProductOrder);
    Router.post('/admin/order/product/delete', Authentic, Smod, Controller_Admin.ProductOrder.DeleteProductOrder);
    Router.post('/admin/order/product/edit', Authentic, Smod, Controller_Admin.ProductOrder.EditProductOrder);
    Router.post('/admin/order/product/add', Authentic, Smod, Controller_Admin.ProductOrder.AddProductOrder);
    Router.post('/admin/order/product/add/search', Authentic, Smod, Controller_Admin.ProductOrder.SearchProductForOrder);

    //Statistical - Admin
    Router.get('/admin/statistical/general/get', Authentic, View, Controller_Admin.Statistical.GetGeneral);
    Router.post('/admin/statistical/analysis/revenue', Authentic, View, Controller_Admin.Statistical.GetRevenueAnalysis);
};