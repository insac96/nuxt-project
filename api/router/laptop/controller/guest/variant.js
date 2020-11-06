//FOR LAPTOP - GUEST

import VariantDB from '../../model/variant';

//Get Variant Test
export const Test = async (req, res, next) => {
    try {
        let Variants = await VariantDB
        .aggregate([
            { 
                $lookup: {
                    from: 'laptopproducts',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: '$product' },
            { $match: 
                { 
                    'product.visibility': true,
                    //'visibility': true,
                    'discount.type': true,
                    'discount.amount': { $gt: 0 },
                    $or: [
                        { status: 'Còn Hàng' },
                        { status: 'Đặt Trước' },
                        { status: 'Mới Về' },
                        { status: 'Đang Về' },
                    ]
                } 
            },
            { 
                $group : { 
                    _id: '$product._id',
                    variants: { 
                        $push: {
                            _id: '$id',
                            code: '$code',
                            screen: '$screen',
                            cpu: '$cpu',
                            ram: '$ram',
                            gpu: '$gpu',
                            harddrive: '$harddrive',
                            price: '$price',
                            status: '$status',
                            visibility: '$visibility',
                            discount: {
                                type: '$discount.type',
                                amount: '$discount.amount',
                            }
                        } 
                    },
                    product : { $first: '$product' }
                } 
            },
        ]);

        res.json(Variants[0]);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get Variant Discount
export const GetListByDiscount = async (req, res, next) => {
    let { skip, limit } = req.body;

    try {
        let Variants = await VariantDB
        .aggregate([
            { 
                $lookup: {
                    from: 'laptopproducts',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: '$product' },
            { $match: 
                { 
                    'product.visibility': true,
                    //'visibility': true,
                    'discount.type': true,
                    'discount.amount': { $gt: 0 },
                    $or: [
                        { status: 'Còn Hàng' },
                        { status: 'Đặt Trước' },
                        { status: 'Mới Về' },
                        { status: 'Đang Về' },
                    ]
                } 
            },
            { $sort : { 'discount.amount' : -1 } },
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) }    
        ]);

        res.json(Variants);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get All Variant New
export const GetListByStatus = async (req, res, next) => {
    let { skip, limit, status } = req.body;

    if(!status) next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
        let Variants = await VariantDB
        .aggregate([
            { 
                $lookup: {
                    from: 'laptopproducts',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: '$product' },
            { $match: 
                { 
                    'product.visibility': true,
                    'visibility': true,
                    'status': status,
                } 
            },
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) }    
        ]);

        res.json(Variants);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};