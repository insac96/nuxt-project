//FOR LAPTOP - ADMIN

import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import VariantColorDB from '../../model/variantColor';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

//Get All Products
export const Get = async (req, res, next) => {
    let { skip, company, trademark, key } = req.body;
    let Query = {};
    
    if(company)
        Query['company'] = company;
    if(trademark)
        Query['trademark'] = trademark;
    if(key){
        let keyCase = StringPlugin.toConvert(key, '-');

        Query['$text'] = { 
            $search: `\"${keyCase}\"`
        };
    }

    try {
        let Products = await ProductDB
        .find(Query)
        .populate({path: 'company', select: 'name'})
        .populate({path: 'trademark', select: 'name'})
        .populate({path: 'variantCount'})
        .skip((skip == 0 || !skip) ? null : Number(skip))
        .limit(10)

        let Count = await ProductDB.countDocuments(Query);

        res.json({
            count: Count,
            products: Products
        });
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add a New Laptop
export const Create = async (req, res, next) => {
    let { product, configuration } = req.body;

    if(!product.name || !product.company || !product.trademark || !configuration) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    let link = StringPlugin.toConvert(product.name, '-');
    product.link = link;

    try {
        let Get = await ProductDB
        .findOne({'link': link})
        .select('_id');

        if(Get) return res.json({
            error: true,
            status: 'name',
            message: 'Tên sản phẩm đã tồn tại'
        });

        //New Product
        let NewProduct = new ProductDB(product);
        await NewProduct.save();

        //New Configuration
        let NewConfiguration = new ConfigurationDB(configuration);
        NewConfiguration.company = NewProduct.company;
        NewConfiguration.trademark = NewProduct.trademark;
        NewConfiguration.product = NewProduct._id;
        await NewConfiguration.save();

        res.json(NewProduct);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Product
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await ProductDB.deleteOne({ '_id': _id });
        await ConfigurationDB.deleteOne({ 'product': _id });
        await VariantDB.deleteMany({ 'product': _id });
        await VariantColorDB.deleteMany({ 'product': _id });
        await WarehouseDB.deleteMany({ 'product': _id });
        await WarehouseColorDB.deleteMany({ 'product': _id });
        await ArticleDB.deleteOne({ 'product': _id })
        await CommentDB.deleteMany({ 'product': _id })
        await ReplyDB.deleteMany({ 'product': _id })

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get A Product by Link
export const GetByLink = async (req, res, next) => {
    let { link } = req.body;

    if(!link) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Product = await ProductDB
        .findOne({'link': link})
        .populate({path: 'company', select: 'name'})
        .populate({path: 'trademark', select: 'name'})
        .populate({path: 'configuration', select: 'default upgrade'})
        .populate({path: 'article'})
        .populate({
            path: 'variants',
            populate: [
                { 
                    path: 'warehouses',
                    populate: { 
                        path: 'colors',
                        //populate: { path: 'variantColor', select: 'code' }
                    }
                },
                { path: 'colors' }
            ]
        })
        .populate({
            path: 'comments', 
            select: 'user content create showInputReply',
            populate: [
                { path: 'user', select: 'profile role' },
                { 
                    path: 'reply', 
                    select: 'user content create', 
                    populate: [ 
                        { path: 'user', select: 'profile role' }
                    ]
                }
            ],
            options: {
                sort: { 'create': -1 },
            }
        });

        if(!Product) throw 'Product Data Not Found';
        
        res.json(Product);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Information of A Product
export const EditInformation = async (req, res, next) => {
    let { _id, company, trademark, name } = req.body;

    if(!_id || !name || !company || !trademark) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    let link = StringPlugin.toConvert(name, '-');

    try {
        let Product = await ProductDB
        .findById(_id)
        .select('_id link');

        if(!Product) throw 'Product Data Not Found';

        if(link != Product.link){
            let Get = await ProductDB
            .findOne({'link': link})
            .select('_id');

            if(Get) return res.json({
                error: true,
                status: 'name',
                message: 'Tên sản phẩm đã tồn tại'
            });
        }

        Product.name = name;
        Product.company = company;
        Product.trademark = trademark;
        Product.link = link;

        await Product.save();
        
        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Image of A Product
export const EditImages = async (req, res, next) => {
    let { _id, images } = req.body;

    if(!_id || !images || !Array.isArray(images)) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Product = await ProductDB
        .findById(_id)
        .select('_id');

        if(!Product) throw 'Product Data Not Found';

        Product.images = images;

        await Product.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Change Visibility of A Product
export const EditVisibility = async (req, res, next) => {
    let { _id, visibility } = req.body;

    if(!_id || visibility == null || typeof(visibility) != 'boolean') return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Product = await ProductDB
        .findById(_id)
        .select('_id');

        if(!Product) throw 'Product Data Not Found';

        Product.visibility = visibility;

        await Product.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};