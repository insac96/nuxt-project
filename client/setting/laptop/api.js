export default {
    admin: {
        //Company
        GetAllCompany: '/laptop/admin/company/get',
        GetAllMiniCompany: '/laptop/admin/company/mini/get',
        CreateNewCompany: '/laptop/admin/company/create',
        DeleteCompany: '/laptop/admin/company/delete',
        EditCompany: '/laptop/admin/company/edit',

        //Trademark
        CreateNewTrademark: '/laptop/admin/trademark/create',
        DeleteTrademark: '/laptop/admin/trademark/delete',
        EditTrademark: '/laptop/admin/trademark/edit',

        //Product
        GetAllProduct: '/laptop/admin/product/get',
        CreateNewProduct: '/laptop/admin/product/create',
        DeleteProduct: '/laptop/admin/product/delete',
        GetProductByLink: '/laptop/admin/product/link/get',
        EditInformationProduct: '/laptop/admin/product/information/edit',
        EditImagesProduct: '/laptop/admin/product/images/edit',
        EditVisibilityProduct: '/laptop/admin/product/visibility/edit',

        //Configuration
        EditDefaultConfiguration: '/laptop/admin/configuration/default/edit',
        EditUpgradeConfiguration: '/laptop/admin/configuration/upgrade/edit',

        //Variant
        CreateNewVariant: '/laptop/admin/variant/create',
        EditVariant: '/laptop/admin/variant/edit',
        DeleteVariant: '/laptop/admin/variant/delete',
        EditVariantDiscount: '/laptop/admin/variant/discount/edit',

        //VariantColor
        CreateVariantColor: '/laptop/admin/variant/color/create',
        EditVariantColor: '/laptop/admin/variant/color/edit',
        DeleteVariantColor: '/laptop/admin/variant/color/delete',

        //Article
        CreateNewArticle: '/laptop/admin/article/create',
        EditArticle: '/laptop/admin/article/edit',
    },

    guest: {
        //Company
        GetAllMiniCompany: '/laptop/company/mini/get',

        //Variant
        GetVariantByDiscount: '/laptop/variant/discount/get',
        GetVariantByStatus: '/laptop/variant/status/get',

        //Product
        GetProductByLink: '/laptop/product/link/get',

        //Comment
        AddComment: '/laptop/comment/add',
        MoreComment: '/laptop/comment/more',
        AddReplyForComment: '/laptop/comment/reply/add'
    }
}