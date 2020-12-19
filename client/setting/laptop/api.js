export default {
    admin: {
        //Company
        GetListCompany: '/laptop/admin/company/list/get',
        GetListCompanyInfo: '/laptop/admin/company/list/getInfo',
        CreateNewCompany: '/laptop/admin/company/create',
        DeleteCompany: '/laptop/admin/company/delete',
        EditCompany: '/laptop/admin/company/edit',

        //Trademark
        CreateNewTrademark: '/laptop/admin/trademark/create',
        DeleteTrademark: '/laptop/admin/trademark/delete',
        EditTrademark: '/laptop/admin/trademark/edit',

        //Product
        GetListProduct: '/laptop/admin/product/list/get',
        CreateNewProduct: '/laptop/admin/product/create',
        DeleteProduct: '/laptop/admin/product/delete',
        GetProductByLink: '/laptop/admin/product/getByLink',
        EditInformationProduct: '/laptop/admin/product/information/edit',
        EditImagesProduct: '/laptop/admin/product/images/edit',
        EditVisibilityProduct: '/laptop/admin/product/visibility/edit',

        //News
        GetListNews: '/laptop/admin/news/list/get',
        GetNewsByID: '/laptop/admin/news/getByID',
        CreateNews: '/laptop/admin/news/create',
        EditNews: '/laptop/admin/news/edit',
        DeleteNews: '/laptop/admin/news/delete',
        EditVisibilityNews: '/laptop/admin/news/visibility/edit',
        EditTopNews: '/laptop/admin/news/top/edit',
        EditInformationNews: '/laptop/admin/news/information/edit',
        EditContentNews: '/laptop/admin/news/content/edit',

        //Configuration
        EditDefaultConfiguration: '/laptop/admin/configuration/default/edit',
        EditUpgradeConfiguration: '/laptop/admin/configuration/upgrade/edit',

        //Variant
        CreateNewVariant: '/laptop/admin/variant/create',
        EditVariant: '/laptop/admin/variant/edit',
        DeleteVariant: '/laptop/admin/variant/delete',
        EditVariantDiscount: '/laptop/admin/variant/discount/edit',
        EditVariantStatus: '/laptop/admin/variant/status/edit',

        //VariantColor
        CreateVariantColor: '/laptop/admin/variant/color/create',
        EditVariantColor: '/laptop/admin/variant/color/edit',
        DeleteVariantColor: '/laptop/admin/variant/color/delete',

        //WareHouse
        ImportWareHouse: '/laptop/admin/warehouse/import',
        EditWarehouseExportPrice: '/laptop/admin/warehouse/export/price/edit',
        EditVisibilityWareHouse: '/laptop/admin/warehouse/visibility/edit',
        DeleteWarehouse: '/laptop/admin/warehouse/delete',

        //WareHouse Color
        CreateWareHouseColor: '/laptop/admin/warehouse/color/create',
        DeleteWareHouseColor: '/laptop/admin/warehouse/color/delete',
        
        //Article
        CreateNewArticle: '/laptop/admin/article/create',
        EditArticle: '/laptop/admin/article/edit',

        //Comment and Reply
        AddComment: '/laptop/admin/comment/add',
        DeleteComment: '/laptop/admin/comment/delete',
        AddReplyForComment: '/laptop/admin/comment/reply/add',
        DeleteReplyOfComment: '/laptop/admin/comment/reply/delete',

        //Order
        GetListOrderByType: '/laptop/admin/order/list/getByType',
        DeleteOrder: '/laptop/admin/order/delete',
        EditStatusOrder: '/laptop/admin/order/status/edit',
        EditDoneOrder: '/laptop/admin/order/done/edit',
        EditInformationOrder: '/laptop/admin/order/information/edit',

        //ProductOrder
        GetListProductOrder: '/laptop/admin/order/product/list/get',
        DeleteProductOrder: '/laptop/admin/order/product/delete',
        EditProductOrder: '/laptop/admin/order/product/edit',
        AddProductOrder: '/laptop/admin/order/product/add',
        SearchProductForOrder: '/laptop/admin/order/product/add/search',

        //Statistical
        GetGeneralStatistical: '/laptop/admin/statistical/general/get'
    },

    guest: {
        //Company
        GetListCompanyInfo: '/laptop/company/list/getInfo',

        //Variant
        GetListVariantByDiscount: '/laptop/variant/list/getByDiscount',
        GetListVariantByStatus: '/laptop/variant/list/getByStatus',
        GetListSearchVariant: '/laptop/variant/list/search',

        //Product
        GetProductByLink: '/laptop/product/getByLink',

        //News
        //GetListNews: '/laptop/news/list/get',
        GetListNewsByTop: '/laptop/news/list/getByTop',
        GetNewsByLink: '/laptop/news/getByLink',

        //Comment and Reply
        GetListCommentByProductID: '/laptop/comment/list/getByProductID',
        AddComment: '/laptop/comment/add',
        MoreComment: '/laptop/comment/more',
        AddReplyForComment: '/laptop/comment/reply/add',

        //Cart
        GetListItemInCart: '/laptop/cart/list/get',

        //Order
        CreateNewOrder: '/laptop/order/create',
    }
}