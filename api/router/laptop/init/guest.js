//FOR GUEST - INIT ROUTER

import Controller_Guest from '../controller/guest';
import { Authentic_Guest } from '../../../middleware/authentic';

export default (Router) => {
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

    //Comment - Guest
    Router.post("/comment/list/getByProductID", Controller_Guest.Comment.GetListByProductID);
    Router.post("/comment/more", Controller_Guest.Comment.More);
    Router.post("/comment/add", Authentic_Guest, Controller_Guest.Comment.Add);
    Router.post("/comment/reply/add", Authentic_Guest, Controller_Guest.Comment.AddReply);

    //Cart - Guest
    Router.post("/cart/list/get", Controller_Guest.Cart.GetList);

    //Order - Guest
    Router.post("/order/create", Authentic_Guest, Controller_Guest.Order.Create);
};